/**
 * SBIR.gov API Client
 *
 * Queries the Small Business Innovation Research (SBIR) and
 * Small Business Technology Transfer (STTR) program APIs
 *
 * API Docs: https://www.sbir.gov/api
 * No authentication required
 *
 * Note: API is currently undergoing maintenance (as of search results)
 * This client includes fallback handling for when API is unavailable
 */

import { Grant } from '@/types/grants';

const SBIR_API_BASE = 'https://www.sbir.gov/api';

interface SBIRAward {
  company: string;
  title: string;
  abstract?: string;
  agency: string;
  program?: string;
  phase?: string;
  awardYear?: number;
  awardAmount?: number;
  [key: string]: any;
}

interface SBIRSolicitation {
  title: string;
  agency: string;
  program?: string;
  open_date?: string;
  close_date?: string;
  link?: string;
  description?: string;
  [key: string]: any;
}

/**
 * Search SBIR/STTR opportunities
 * Returns small business R&D grants
 */
export async function searchSBIR(params: {
  keyword?: string;
  limit?: number;
}): Promise<Grant[]> {
  try {
    const { keyword = '', limit = 5 } = params;

    // Try to fetch open solicitations
    const solicitations = await fetchSBIRSolicitations(keyword, limit);

    console.log(`SBIR API returned ${solicitations.length} solicitations`);

    if (solicitations.length > 0) {
      return solicitations;
    }

    // Fallback: Return curated SBIR/STTR opportunities
    // (useful when API is down or returns no results)
    console.log('SBIR API returned no results, using curated grants');
    return getCuratedSBIRGrants();

  } catch (error) {
    console.error('Error querying SBIR.gov API:', error);
    // Return curated grants as fallback
    return getCuratedSBIRGrants();
  }
}

/**
 * Fetch current SBIR/STTR solicitations
 */
async function fetchSBIRSolicitations(
  keyword: string,
  limit: number
): Promise<Grant[]> {
  try {
    // Query solicitations API
    const response = await fetch(
      `${SBIR_API_BASE}/solicitations.json?keyword=${encodeURIComponent(keyword)}&rows=${limit}`,
      {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`SBIR API returned ${response.status}`);
    }

    const data = await response.json();
    const solicitations: SBIRSolicitation[] = data.result || data.solicitations || [];

    return solicitations.map(sol => transformSBIRToGrant(sol));

  } catch (error) {
    console.error('SBIR solicitations API error:', error);
    return [];
  }
}

/**
 * Transform SBIR solicitation to our Grant type
 */
function transformSBIRToGrant(sol: SBIRSolicitation): Grant {
  let description = sol.description || `${sol.program || 'SBIR/STTR'} funding opportunity for small business innovation and research.`;

  // Add deadline info
  if (sol.close_date) {
    const closeDate = new Date(sol.close_date);
    description += ` Application deadline: ${closeDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}.`;
  }

  const eligibility = [
    'Must be a for-profit small business',
    'Must be located in the United States',
    'Must be majority-owned by U.S. citizens or permanent residents',
    'Employee count must not exceed 500',
  ];

  if (sol.program) {
    eligibility.push(`Program: ${sol.program}`);
  }

  return {
    name: sol.title || `${sol.agency} SBIR/STTR Program`,
    description: description.trim(),
    whyGoodFit: `This ${sol.agency || 'federal'} SBIR/STTR program is designed specifically for small businesses pursuing innovative R&D projects. Perfect for early-stage technology development and commercialization.`,
    eligibility,
    link: sol.link || 'https://www.sbir.gov/opportunities',
  };
}

/**
 * Returns curated list of major SBIR/STTR programs
 * Used as fallback when API is unavailable
 */
function getCuratedSBIRGrants(): Grant[] {
  const today = new Date();
  const nextQuarter = new Date(today.setMonth(today.getMonth() + 3));

  return [
    {
      name: 'NSF Small Business Innovation Research (SBIR) Program',
      description: `The National Science Foundation provides funding to small businesses for research and development with commercial potential. Phase I awards up to $275,000, Phase II up to $1,000,000. Next deadline: ${nextQuarter.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} (rolling submissions).`,
      whyGoodFit: 'The NSF SBIR program is ideal for technology startups and small businesses pursuing cutting-edge research with commercial applications. It supports high-risk, high-reward innovation across all fields of science and engineering.',
      eligibility: [
        'Must be a for-profit small business (≤500 employees)',
        'Must be located in the United States',
        'Majority-owned by U.S. citizens or permanent residents',
        'Principal investigator must be primarily employed by the small business',
        'Focus on technological innovation with commercial potential',
      ],
      link: 'https://www.sbir.gov/node/2101093',
    },
    {
      name: 'NIH Small Business Innovation Research (SBIR) Program',
      description: `The National Institutes of Health funds health and biomedical research and development by small businesses. Phase I awards up to $300,000, Phase II up to $2,000,000. Applications accepted year-round with three annual deadlines.`,
      whyGoodFit: 'The NIH SBIR program is perfect for small businesses developing health-related technologies, therapeutics, diagnostics, or medical devices. It provides substantial funding for both early-stage and commercialization efforts.',
      eligibility: [
        'Must be a for-profit small business (≤500 employees)',
        'Located in the United States',
        'Majority-owned by U.S. citizens or permanent residents',
        'Project must address health or biomedical research',
        'Principal investigator primarily employed by the company',
      ],
      link: 'https://www.sbir.gov/node/1426281',
    },
  ];
}
