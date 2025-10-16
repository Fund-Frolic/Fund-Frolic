/**
 * Find Grants API Route
 *
 * POST endpoint that accepts project details and uses OpenAI to find matching grants
 */

import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { SearchRequest, GrantResult, Grant } from '@/types/grants';
import { writeGrantSearch } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
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

    // Get current date to provide context to AI
    const today = new Date();
    const todayFormatted = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Create structured prompt for OpenAI
    const prompt = `You are a grant funding expert. Based on the following project details, find 3 specific, real grants that would be a great match.

TODAY'S DATE: ${todayFormatted}

Project Description: ${projectDescription}
Revenue Status: ${revenueStatus === 'positive' ? 'Revenue Positive' : 'Not Revenue Positive'}
Organization Type: ${organizationType === 'for-profit' ? 'For-Profit' : 'Non-Profit'}

CRITICAL DEADLINE REQUIREMENTS:
- TODAY IS ${todayFormatted}
- Only recommend grants with deadlines AFTER ${todayFormatted}
- Do NOT recommend any grants with deadlines before ${todayFormatted}
- If a grant had a deadline in the past (e.g., February 2025, March 2025, etc. when today is ${todayFormatted}), it is EXPIRED and must NOT be included
- Only include grants that are CURRENTLY ACCEPTING APPLICATIONS or have FUTURE deadlines

Please return ONLY a valid JSON array with exactly 3 grants. Each grant must have:
- name: The official grant name
- description: A brief description of the grant (2-3 sentences). MUST include the application deadline date if known, or clearly state if it has rolling/ongoing deadlines.
- whyGoodFit: Specific reasons why this grant matches the project (2-3 sentences)
- eligibility: An array of key eligibility requirements (3-5 items)
- link: A valid URL to the grant application or information page

Focus on federal, state, and reputable private grants. Prioritize grants that:
- Have deadlines AFTER ${todayFormatted} (remember, today is ${todayFormatted})
- Have rolling deadlines or year-round application windows
- Match the organization type (${organizationType})
- Align with the revenue status (${revenueStatus})
- Are relevant to any special designations mentioned (veteran-owned, minority-owned, women-owned, etc.)

DEADLINE VERIFICATION CHECKLIST (verify each grant before including):
✓ Is the deadline after ${todayFormatted}?
✓ If the grant has a specific month/year deadline, is it in the FUTURE?
✓ If unsure about deadline, does it explicitly state "rolling" or "ongoing"?
✗ If any deadline is before ${todayFormatted}, DO NOT include this grant

Return ONLY the JSON array, no additional text or formatting.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a grant funding expert who provides accurate, specific grant recommendations. Always return valid JSON arrays only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Extract and parse response
    const responseText = completion.choices[0]?.message?.content?.trim();

    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    let grants: Grant[];
    try {
      grants = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseText);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate response structure
    if (!Array.isArray(grants) || grants.length !== 3) {
      throw new Error('AI did not return exactly 3 grants');
    }

    // Validate each grant has required fields
    for (const grant of grants) {
      if (!grant.name || !grant.description || !grant.whyGoodFit ||
          !Array.isArray(grant.eligibility) || !grant.link) {
        throw new Error('Invalid grant structure in AI response');
      }
    }

    // Create result object
    const result: GrantResult = {
      grants,
      searchId: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    // Sync to Google Sheets (don't await - fire and forget)
    writeGrantSearch(result, body).catch((error) => {
      console.error('Failed to sync grant search to Google Sheets:', error);
    });

    return NextResponse.json(result);

  } catch (error: unknown) {
    console.error('Error in find-grants API:', error);

    // Handle specific OpenAI errors
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as { status?: number; message?: string };

      if (apiError.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a moment.' },
          { status: 429 }
        );
      }

      if (apiError.status === 401) {
        return NextResponse.json(
          { error: 'API authentication error. Please contact support.' },
          { status: 500 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to find grants. Please try again.' },
      { status: 500 }
    );
  }
}
