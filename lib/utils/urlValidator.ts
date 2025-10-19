/**
 * URL Validation Utility
 *
 * Validates URLs to ensure they're accessible (not 404s)
 * Used to filter out dead grant links before displaying to users
 */

// Domains that require subscriptions or paywalls
const SUBSCRIPTION_DOMAINS = [
  'grantwatch.com',
  'instrumentl.com',
  'candid.org',
  'foundationcenter.org',
  'grantstation.com',
  'grantsmart.org',
  'foundationsearch.com',
  'chronicle.com',
];

/**
 * Check if URL is from a subscription/paywall site
 * @param url - The URL to check
 * @returns true if URL requires subscription, false otherwise
 */
export function isSubscriptionSite(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '');

    return SUBSCRIPTION_DOMAINS.some(domain =>
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Validates a single URL by checking if it returns a successful status code
 * @param url - The URL to validate
 * @returns true if URL is valid (200-399 status), false otherwise
 */
export async function validateUrl(url: string): Promise<boolean> {
  // First check if it's a subscription site
  if (isSubscriptionSite(url)) {
    console.warn(`Filtered subscription site: ${url}`);
    return false;
  }

  try {
    // Use HEAD request for faster validation (doesn't download body)
    const response = await fetch(url, {
      method: 'HEAD',
      // Set timeout to avoid hanging on slow servers
      signal: AbortSignal.timeout(5000),
      // Don't follow redirects beyond 5 hops
      redirect: 'follow',
    });

    // Accept 200-399 status codes as valid
    return response.ok || (response.status >= 300 && response.status < 400);
  } catch (error) {
    // Network errors, timeouts, etc. = invalid URL
    console.warn(`URL validation failed for ${url}:`, error);
    return false;
  }
}

/**
 * Validates multiple URLs in parallel
 * @param urls - Array of URLs to validate
 * @returns Array of booleans matching input order
 */
export async function validateUrls(urls: string[]): Promise<boolean[]> {
  return Promise.all(urls.map(url => validateUrl(url)));
}

/**
 * Filters an array of items based on URL validation
 * @param items - Array of items with a 'link' property
 * @returns Filtered array containing only items with valid URLs
 */
export async function filterValidUrls<T extends { link: string }>(
  items: T[]
): Promise<T[]> {
  const validationResults = await validateUrls(items.map(item => item.link));
  return items.filter((_, index) => validationResults[index]);
}
