import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { chatRef: string } }) {
  try {
    const { chatRef } = await params;

    if (!chatRef) {
      return NextResponse.json({ error: 'Missing chatRef' }, { status: 400 });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const body = await req.json();

    const response = await fetch(
      `${process.env.STAR_WARS_PUBLIC_API_URL}/message/${chatRef}`,
      {
        method: 'POST',
        headers: { 
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error('Error sending message:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
