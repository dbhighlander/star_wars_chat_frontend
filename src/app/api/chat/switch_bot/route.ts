import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const botSlug = url.searchParams.get('botSlug');
    const chatRef = url.searchParams.get('chatRef');

    if (!botSlug || !chatRef) {
      return NextResponse.json({ error: 'Missing botSlug or chatRef' }, { status: 400 });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `${process.env.STAR_WARS_PUBLIC_API_URL}/chats/switch_bot/${botSlug}/${chatRef}`,
      {
        method: 'GET',
        headers: { 'X-API-Key': apiKey },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error('Error proxying request:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}