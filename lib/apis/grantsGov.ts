/**
 * Grants.gov API Client
 *
 * Queries the federal Grants.gov RESTful API for grant opportunities
 * API Docs: https://www.grants.gov/api
 * No authentication required for public search endpoints
 */

import { Grant } from '@/types/grants';

// Grants.gov API base URL
const GRANTS_GOV_API_BASE = 'https://www.grants.gov/api/v1';

interface GrantsGovOpportunity {
  opportunityId: string;
  opportunityNumber: string;
  opportunityTitle: string;
  agencyName: string;
  description?: string;
  eligibility?: string;
  closeDate?: string;
  awardCeiling?: number;
  awardFloor?: number;
  category?: string;
  categoryExplanation?: string;
  fundingInstrumentType?: string;
  opportunityCategory?: string;
  [key: string]: any; // Other fields we might not use
}

interface GrantsGovSearchResponse {
  opportunities?: GrantsGovOpportunity[];
  recordCount?: number;
  [key: string]: any;
}

/**
 * Search Grants.gov for opportunities matching criteria
 */
export async function searchGrantsGov(params: {
  keyword?: string;
  eligibility?: 'for-profit' | 'non-profit';
  limit?: number;
}): Promise<Grant[]> {
  try {
    const {
      keyword = '',
      eligibility,
      limit = 10,
    } = params;

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (keyword) {
      queryParams.append('keyword', keyword);
    }

    // Map our eligibility to Grants.gov categories
    if (eligibility === 'for-profit') {
      queryParams.append('eligibility', '25'); // For-profit organizations
    } else if (eligibility === 'non-profit') {
      queryParams.append('eligibility', '00'); // Nonprofits
    }

    queryParams.append('sortBy', 'openDate');
    queryParams.append('sortOrder', 'desc');
    queryParams.append('rows', limit.toString());

    // Call Grants.gov search2 API
    const apiUrl = `${GRANTS_GOV_API_BASE}/search2?${queryParams.toString()}`;
    console.log(`Querying Grants.gov: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error(`Grants.gov API returned ${response.status}: ${response.statusText}`);
      throw new Error(`Grants.gov API returned ${response.status}`);
    }

    const data: GrantsGovSearchResponse = await response.json();
    console.log(`Grants.gov returned ${data.opportunities?.length || 0} opportunities`);

    // Transform Grants.gov opportunities to our Grant type
    const grants: Grant[] = (data.opportunities || []).map(opp => transformToGrant(opp));

    return grants;

  } catch (error) {
    console.error('Error querying Grants.gov API:', error);
    // Return empty array on error - don't fail the entire search
    return [];
  }
}

/**
 * Transform a Grants.gov opportunity into our Grant type
 */
function transformToGrant(opp: GrantsGovOpportunity): Grant {
  // Build description
  let description = opp.description || opp.categoryExplanation || 'Federal grant opportunity';

  // Add deadline info if available
  if (opp.closeDate) {
    const closeDate = new Date(opp.closeDate);
    description += ` Application deadline: ${closeDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}.`;
  } else {
    description += ' Check Grants.gov for current deadlines.';
  }

  // Build eligibility array
  const eligibility: string[] = [];

  if (opp.eligibility) {
    eligibility.push(opp.eligibility);
  }

  if (opp.category) {
    eligibility.push(`Category: ${opp.category}`);
  }

  if (opp.awardCeiling && opp.awardFloor) {
    eligibility.push(`Award range: $${opp.awardFloor.toLocaleString()} - $${opp.awardCeiling.toLocaleString()}`);
  } else if (opp.awardCeiling) {
    eligibility.push(`Maximum award: $${opp.awardCeiling.toLocaleString()}`);
  }

  // Ensure we have at least one eligibility item
  if (eligibility.length === 0) {
    eligibility.push('See Grants.gov for detailed eligibility requirements');
  }

  // Build Grants.gov URL
  const grantsGovUrl = `https://www.grants.gov/search-results-detail/${opp.opportunityNumber}`;

  return {
    name: opp.opportunityTitle || 'Federal Grant Opportunity',
    description: description.trim(),
    whyGoodFit: `This ${opp.agencyName || 'federal'} grant aligns with your project and organization type. The funding supports projects in ${opp.category || 'your field'}.`,
    eligibility,
    link: grantsGovUrl,
  };
}
