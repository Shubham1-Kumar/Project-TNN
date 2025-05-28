// app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid or missing "content"' },
        { status: 400 }
      );
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: content }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('HuggingFace API error:', data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const summary = data[0]?.summary_text?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: 'Failed to generate summary' },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: 'Summarization failed' },
      { status: 500 }
    );
  }
}
