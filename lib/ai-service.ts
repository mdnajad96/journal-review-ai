/**
 * AI Service - OpenAI/Claude Integration
 * Handles all AI-powered analysis of journal papers
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * Summarize journal text using AI
 * @param text - The journal/paper text to summarize
 * @returns AI-generated summary
 */
export async function summarizeJournal(text: string): Promise<AIResponse> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert research paper analyst. Provide clear, concise summaries of academic papers.',
          },
          {
            role: 'user',
            content: `Please summarize the following research paper in 2-3 paragraphs:\n\n${text}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to summarize');
    }

    return {
      success: true,
      data: data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error in summarizeJournal:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Extract key findings from journal text
 * @param text - The journal/paper text
 * @returns Array of key findings
 */
export async function extractKeyFindings(text: string): Promise<AIResponse> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert research paper analyst. Extract key findings from papers.',
          },
          {
            role: 'user',
            content: `Extract the 5 most important findings from this research paper. Format as a numbered list:\n\n${text}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 400,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to extract findings');
    }

    return {
      success: true,
      data: data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error in extractKeyFindings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Polish research proposal text
 * @param text - The proposal text to improve
 * @returns Polished proposal text
 */
export async function polishProposal(text: string): Promise<AIResponse> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert academic writer. Improve research proposals for clarity, impact, and professionalism.',
          },
          {
            role: 'user',
            content: `Please improve this research proposal. Make it more compelling, clearer, and more professional:\n\n${text}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to polish proposal');
    }

    return {
      success: true,
      data: data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error in polishProposal:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate literature review from multiple papers
 * @param papers - Array of paper summaries/text
 * @returns Generated literature review
 */
export async function generateLiteratureReview(papers: string[]): Promise<AIResponse> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const papersText = papers.join('\n\n---\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in writing comprehensive literature reviews. Synthesize research papers into cohesive narratives.',
          },
          {
            role: 'user',
            content: `Generate a literature review from these papers:\n\n${papersText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate literature review');
    }

    return {
      success: true,
      data: data.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error in generateLiteratureReview:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
