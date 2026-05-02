/**
 * Journal API Service
 * Integrations with arXiv, CrossRef, and other journal databases
 */

interface PaperMetadata {
  title: string;
  authors: string[];
  publishedDate: string;
  abstract: string;
  url: string;
  source: string;
}

interface SearchResponse {
  success: boolean;
  data?: PaperMetadata[];
  error?: string;
}

/**
 * Search arXiv for papers by topic
 * @param query - Search query/topic
 * @param limit - Number of results to return
 * @returns Array of paper metadata
 */
export async function searchArxiv(query: string, limit = 10): Promise<SearchResponse> {
  try {
    // Format query for arXiv API
    const encodedQuery = encodeURIComponent(query);
    const url = `http://export.arxiv.org/api/query?search_query=all:${encodedQuery}&start=0&max_results=${limit}&sortBy=submittedDate&sortOrder=descending`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch from arXiv');
    }

    const text = await response.text();

    // Parse XML response (simple parsing)
    const papers: PaperMetadata[] = [];
    const regex = /<entry>(.*?)<\/entry>/gs;
    const matches = text.matchAll(regex);

    for (const match of matches) {
      const entry = match[1];
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const authorMatches = entry.matchAll(/<author>\s*<name>(.*?)<\/name>/g);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      const summaryMatch = entry.match(/<summary>(.*?)<\/summary>/);
      const urlMatch = entry.match(/<id>(.*?)<\/id>/);

      if (titleMatch && authorMatches && publishedMatch) {
        const authors = Array.from(authorMatches).map(m => m[1]);
        papers.push({
          title: titleMatch[1].trim(),
          authors,
          publishedDate: publishedMatch[1],
          abstract: summaryMatch ? summaryMatch[1].trim() : '',
          url: urlMatch ? urlMatch[1] : '',
          source: 'arXiv',
        });
      }
    }

    return {
      success: true,
      data: papers,
    };
  } catch (error) {
    console.error('Error in searchArxiv:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search CrossRef for papers by DOI or metadata
 * @param query - Search query
 * @param limit - Number of results to return
 * @returns Array of paper metadata
 */
export async function searchCrossRef(query: string, limit = 10): Promise<SearchResponse> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.crossref.org/works?query=${encodedQuery}&rows=${limit}&sort=published&order=desc`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from CrossRef');
    }

    const data = await response.json();

    const papers: PaperMetadata[] = data.message.items.map((item: any) => ({
      title: item.title?.[0] || 'Unknown',
      authors: item.author?.map((a: any) => `${a.given || ''} ${a.family || ''}`.trim()) || [],
      publishedDate: item.published?.['date-parts']?.[0]?.join('-') || 'Unknown',
      abstract: item.abstract || '',
      url: item.DOI ? `https://doi.org/${item.DOI}` : item.URL || '',
      source: 'CrossRef',
    }));

    return {
      success: true,
      data: papers,
    };
  } catch (error) {
    console.error('Error in searchCrossRef:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search both arXiv and CrossRef
 * @param query - Search query
 * @param limit - Number of results per source
 * @returns Combined array of paper metadata
 */
export async function searchAllSources(query: string, limit = 5): Promise<SearchResponse> {
  try {
    const [arxivResults, crossRefResults] = await Promise.all([
      searchArxiv(query, limit),
      searchCrossRef(query, limit),
    ]);

    const papers: PaperMetadata[] = [];

    if (arxivResults.success && arxivResults.data) {
      papers.push(...arxivResults.data);
    }

    if (crossRefResults.success && crossRefResults.data) {
      papers.push(...crossRefResults.data);
    }

    return {
      success: true,
      data: papers.slice(0, limit * 2),
    };
  } catch (error) {
    console.error('Error in searchAllSources:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
