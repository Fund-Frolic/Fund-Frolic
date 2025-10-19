/**
 * Grantmakers.io API Client
 *
 * Queries the open-source Grantmakers.io database of private foundations
 * Based on IRS 990-PF filings - 156,000+ grantmaking institutions
 *
 * Website: https://www.grantmakers.io/
 * License: Forever free, open source
 *
 * Note: Grantmakers.io provides foundation data, not active grant opportunities.
 * This client returns general foundation information that may have grants available.
 */

import { Grant } from '@/types/grants';

/**
 * Search for foundation grants matching criteria
 *
 * Note: Since Grantmakers.io doesn't have a public API (it's a data download),
 * we'll return curated foundation grants that are commonly available
 *
 * In production, you could:
 * 1. Download the Grantmakers.io dataset periodically
 * 2. Store it in your database
 * 3. Query your database based on user criteria
 */
export async function searchGrantmakers(params: {
  keyword?: string;
  limit?: number;
}): Promise<Grant[]> {
  try {
    // For now, return curated major foundation grants
    // In production, this would query a database of foundation 990-PF data
    return getCuratedFoundationGrants();

  } catch (error) {
    console.error('Error querying foundation grants:', error);
    return [];
  }
}

/**
 * Returns curated list of major private foundations with active grant programs
 * These are real foundations that commonly fund nonprofits
 */
function getCuratedFoundationGrants(): Grant[] {
  return [
    {
      name: 'Google.org Impact Challenge',
      description: 'Google.org provides grants to nonprofits using technology and innovative approaches to tackle social challenges. Grant amounts typically range from $500,000 to $2,000,000. Applications are accepted on a rolling basis for specific challenge themes announced throughout the year.',
      whyGoodFit: 'This grant is ideal for nonprofits leveraging technology to create scalable social impact. Google.org looks for innovative solutions that can be replicated and scaled globally.',
      eligibility: [
        'Must be a registered 501(c)(3) nonprofit organization',
        'Project must use technology or innovative approaches',
        'Must demonstrate potential for scalable impact',
        'Strong leadership and execution track record required',
        'Focus on specific challenge themes (education, economic opportunity, etc.)',
      ],
      link: 'https://www.google.org/impactchallenge/',
    },
    {
      name: 'Chan Zuckerberg Initiative Community Grants',
      description: 'The Chan Zuckerberg Initiative funds nonprofits working in education, science, and community development. Grants range from $50,000 to $500,000 annually. Focus areas include K-12 education, housing affordability, and scientific research infrastructure.',
      whyGoodFit: 'CZI prioritizes organizations working on systemic change in education and science. They value data-driven approaches and organizations committed to diversity, equity, and inclusion.',
      eligibility: [
        'Must be a 501(c)(3) tax-exempt organization',
        'Alignment with CZI focus areas (education, science, community)',
        'Demonstrated track record of impact',
        'Commitment to diversity, equity, and inclusion',
        'Data-driven approach to measuring outcomes',
      ],
      link: 'https://chanzuckerberg.com/grants-ventures/grants/',
    },
    {
      name: 'The Robert Wood Johnson Foundation (RWJF) Grants',
      description: 'RWJF is the nation\'s largest philanthropy dedicated to health. They provide grants from $50,000 to several million dollars for programs addressing health equity, public health systems, and social determinants of health. Multiple funding opportunities throughout the year with specific calls for proposals.',
      whyGoodFit: 'Perfect for nonprofits working on health equity, community health, and addressing social factors that affect health outcomes. RWJF values bold ideas and collaborative approaches.',
      eligibility: [
        'Must be a 501(c)(3) nonprofit organization or public entity',
        'Project addresses health equity or public health',
        'Strong evaluation and measurement plan',
        'Demonstrated community engagement',
        'Focus on systemic change and sustainable impact',
      ],
      link: 'https://www.rwjf.org/en/grants/grants-list.html',
    },
  ];
}

/**
 * Helper to search foundation database (for future implementation)
 *
 * In production, you would:
 * 1. Download Grantmakers.io IRS 990-PF dataset
 * 2. Store in database (PostgreSQL, MongoDB, etc.)
 * 3. Index by: location, focus areas, grant amounts, etc.
 * 4. Query based on user's project description and needs
 */
export async function searchFoundationDatabase(
  keyword: string,
  state?: string,
  focusArea?: string
): Promise<Grant[]> {
  // Placeholder for future database implementation
  // This would query your foundation database
  return [];
}
