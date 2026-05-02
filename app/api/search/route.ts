import { NextRequest, NextResponse } from 'next/server';
import { searchArxiv, searchCrossRef, searchAllSources } from '@/lib/journal-api';

/**
 * GET /api/search
 * Search for papers by topic
 * Query params: topic, source (arxiv|crossref|all), limit
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const topic = searchParams.get('topic');
    const source = searchParams.get('source') || 'arxiv';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic parameter required' },
        { status: 400 }
      );
    }

    let result;

    switch (source) {
      case 'arxiv':
        result = await searchArxiv(topic, limit);
        break;
      case 'crossref':
        result = await searchCrossRef(topic, limit);
        break;
      case 'all':
        result = await searchAllSources(topic, limit);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid source' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      papers: result.data,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
