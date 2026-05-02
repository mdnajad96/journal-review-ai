import { NextRequest, NextResponse } from 'next/server';
import { summarizeJournal, extractKeyFindings, polishProposal } from '@/lib/ai-service';

/**
 * POST /api/analyze
 * Analyze journal text with AI
 */
export async function POST(request: NextRequest) {
  try {
    const { text, analysisType } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    let result;

    switch (analysisType) {
      case 'summarize':
        result = await summarizeJournal(text);
        break;
      case 'keyFindings':
        result = await extractKeyFindings(text);
        break;
      case 'polishProposal':
        result = await polishProposal(text);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid analysis type' },
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
      result: result.data,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}
