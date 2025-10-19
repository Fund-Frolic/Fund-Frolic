/**
 * Tavily API Client
 *
 * Real-time web search API for AI applications
 * Docs: https://docs.tavily.com/
 */

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface TavilyResponse {
  results: TavilySearchResult[];
  query: string;
}

/**
 * Search the web using Tavily API
 * Returns real-time search results with content snippets
 */
export async function searchWeb(params: {
  query: string;
  maxResults?: number;
  searchDepth?: 'basic' | 'advanced';
}): Promise<TavilySearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    console.error('TAVILY_API_KEY is not set');
    return [];
  }

  try {
    const { query, maxResults = 5, searchDepth = 'advanced' } = params;

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: maxResults,
        search_depth: searchDepth,
        include_answer: false,
        include_raw_content: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API returned ${response.status}`);
    }

    const data: TavilyResponse = await response.json();
    return data.results || [];

  } catch (error) {
    console.error('Error querying Tavily API:', error);
    return [];
  }
}
