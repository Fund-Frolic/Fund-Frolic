/**
 * Grant Finding Types
 *
 * TypeScript interfaces for grant search and results
 */

export interface SearchRequest {
  projectDescription: string;
  revenueStatus: 'positive' | 'not-positive';
  organizationType: 'for-profit' | 'non-profit';
}

export interface Grant {
  name: string;
  description: string;
  whyGoodFit: string;
  eligibility: string[];
  link: string;
}

export interface GrantResult {
  grants: Grant[];
  searchId: string;
  timestamp: string;
}

export interface ContactSubmission {
  searchId?: string;
  name: string;
  email: string;
  organizationName?: string;
  phone?: string;
  // Optional grant results data for sending emails
  grantResults?: GrantResult;
  searchRequest?: SearchRequest;
}
