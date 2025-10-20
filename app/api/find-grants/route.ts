/**
 * Find Grants API Route - AI-Powered Search
 *
 * POST endpoint that uses AI to find grants:
 * 1. Tavily web search to find grant opportunities
 * 2. OpenAI to analyze and extract the best matches
 * 3. URL validation to filter out dead links and subscription sites
 * 4. Deduplication to ensure unique results
 */

import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { SearchRequest, GrantResult, Grant } from '@/types/grants';
import { writeGrantSearch } from '@/lib/googleSheets';
import { filterValidUrls } from '@/lib/utils/urlValidator';
import { searchWeb } from '@/lib/apis/tavily';

export async function POST(request: NextRequest) {
  try {
    // Debug logging for production
    console.log('=== FIND GRANTS API DEBUG ===');
    console.log('Environment check:', {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7),
      hasTavilyKey: !!process.env.TAVILY_API_KEY,
      nodeEnv: process.env.NODE_ENV
    });

    const body: SearchRequest = await request.json();
    const { projectDescription, revenueStatus, organizationType } = body;

    // Validate input
    if (!projectDescription || projectDescription.trim().length < 20) {
      return NextResponse.json(
        { error: 'Project description must be at least 20 characters' },
        { status: 400 }
      );
    }

    if (!['positive', 'not-positive'].includes(revenueStatus)) {
      return NextResponse.json(
        { error: 'Invalid revenue status' },
        { status: 400 }
      );
    }

    if (!['for-profit', 'non-profit'].includes(organizationType)) {
      return NextResponse.json(
        { error: 'Invalid organization type' },
        { status: 400 }
      );
    }

    console.log('Starting AI-powered grant search for:', { organizationType, revenueStatus });

    // AI-ONLY SEARCH: Use Tavily + OpenAI for best results
    const aiGrants = await searchGrantsWithAI(projectDescription, revenueStatus, organizationType);

    console.log(`AI Search: Found ${aiGrants.length} grants from AI web search`);

    // Filter out duplicates
    const uniqueGrants = deduplicateGrants(aiGrants);

    console.log(`After deduplication: ${uniqueGrants.length} unique grants`);

    // Validate URLs (filters out dead links and subscription sites)
    const validGrants = await filterValidUrls(uniqueGrants);

    console.log(`After URL validation: ${validGrants.length} grants have valid, free URLs`);

    // Select top 3 grants
    let topGrants = validGrants.slice(0, 3);

    console.log(`Selected ${topGrants.length} top grants`);

    // If we don't have 3 grants, use unvalidated AI results as backup
    if (topGrants.length < 3) {
      console.log(`Only ${topGrants.length} validated grants, adding AI results as backup`);
      const remainingNeeded = 3 - topGrants.length;
      const backupGrants = aiGrants
        .filter(g => !topGrants.some(t => t.name === g.name))
        .slice(0, remainingNeeded);
      topGrants.push(...backupGrants);
    }

    // If still no grants, throw error
    if (topGrants.length === 0) {
      throw new Error('No grants found matching criteria');
    }

    console.log(`Final: Returning ${topGrants.length} grant(s)`);

    // Create result object
    const result: GrantResult = {
      grants: topGrants.slice(0, 3), // Ensure we return up to 3 grants
      searchId: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    // Sync to Google Sheets
    try {
      await writeGrantSearch(result, body);
    } catch (sheetsError) {
      console.error('Failed to sync grant search to Google Sheets:', sheetsError);
    }

    return NextResponse.json(result);

  } catch (error: unknown) {
    console.error('=== ERROR IN FIND-GRANTS API ===');
    console.error('Error details:', error);
    console.error('Error type:', typeof error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // Handle specific OpenAI errors
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as { status?: number; message?: string };

      console.error('API Error status:', apiError.status);
      console.error('API Error message:', apiError.message);

      if (apiError.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a moment.' },
          { status: 429 }
        );
      }

      if (apiError.status === 401) {
        return NextResponse.json(
          { error: 'API authentication error. OpenAI key may be invalid.' },
          { status: 500 }
        );
      }
    }

    // Generic error response with more details in development
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to find grants. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Use Tavily to search the web, then OpenAI to analyze and structure results
 */
async function searchGrantsWithAI(
  projectDescription: string,
  revenueStatus: string,
  organizationType: string
): Promise<Grant[]> {
  try {
    const today = new Date();
    const todayFormatted = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // STEP 1: Search the web with Tavily for real grant opportunities
    const searchQuery = `${organizationType === 'for-profit' ? 'for-profit business' : 'nonprofit'} grants ${projectDescription.slice(0, 100)} ${new Date().getFullYear()}`;

    console.log(`Tavily search query: ${searchQuery}`);
    const webResults = await searchWeb({
      query: searchQuery,
      maxResults: 8,
      searchDepth: 'advanced',
    });

    console.log(`Tavily returned ${webResults.length} web results`);

    if (webResults.length === 0) {
      console.log('No web results from Tavily, returning empty array');
      return [];
    }

    // STEP 2: Use GPT-4o to analyze search results and extract grant info
    const webContext = webResults.map((result, idx) =>
      `[${idx + 1}] ${result.title}\nURL: ${result.url}\n${result.content}\n`
    ).join('\n---\n\n');

    const prompt = `You are a grant funding expert. I've searched the web and found these results about grant opportunities. Analyze them and extract the 3 BEST grant opportunities that match the project.

TODAY'S DATE: ${todayFormatted}

Project Description: ${projectDescription}
Revenue Status: ${revenueStatus === 'positive' ? 'Revenue Positive' : 'Not Revenue Positive'}
Organization Type: ${organizationType === 'for-profit' ? 'For-Profit' : 'Non-Profit'}

WEB SEARCH RESULTS:
${webContext}

TASK:
Analyze the web results above and select the 3 BEST grant opportunities that:
1. Match the organization type (${organizationType})
2. Are currently open or have rolling deadlines
3. Align with the project description
4. Have a valid, specific URL from the search results
5. ARE COMPLETELY FREE TO ACCESS (no subscription or paywall required)

CRITICAL - EXCLUDE THESE SUBSCRIPTION SITES:
❌ GrantWatch.com
❌ Instrumentl.com
❌ Candid.org
❌ FoundationCenter.org
❌ GrantStation.com
❌ GrantSmart.org
❌ FoundationSearch.com
❌ Chronicle.com

ONLY include grants from:
✅ Government websites (.gov)
✅ Foundation websites that are freely accessible
✅ Non-profit organization websites
✅ University grant portals
✅ Free grant directories

Return ONLY a valid JSON array with exactly 3 grants:
[
  {
    "name": "Grant Name (from search results)",
    "description": "Description with deadline info",
    "whyGoodFit": "Why this matches the project",
    "eligibility": ["requirement 1", "requirement 2", "requirement 3"],
    "link": "https://exact-url-from-search-results.com"
  }
]

IMPORTANT: Only use URLs that appear in the search results above. Do not make up URLs. Never include subscription/paywall sites.

Return ONLY the JSON array, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a grant funding expert. Analyze web search results and extract real grant opportunities. Only return grants with URLs that were provided in the search results.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5, // Lower temperature for more accurate extraction
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      return [];
    }

    // Parse JSON response
    try {
      const grants = JSON.parse(responseText);
      if (Array.isArray(grants)) {
        return grants.filter(g =>
          g.name && g.description && g.whyGoodFit &&
          Array.isArray(g.eligibility) && g.link
        );
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
    }

    return [];

  } catch (error) {
    console.error('Error in AI grant search:', error);
    return [];
  }
}

/**
 * Remove duplicate grants based on name similarity
 */
function deduplicateGrants(grants: Grant[]): Grant[] {
  const seen = new Set<string>();
  const unique: Grant[] = [];

  for (const grant of grants) {
    // Normalize name for comparison (lowercase, remove special chars)
    const normalizedName = grant.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (!seen.has(normalizedName)) {
      seen.add(normalizedName);
      unique.push(grant);
    }
  }

  return unique;
}

