// src/app/api/chat/message/[chatRef]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { chatRef: string } }
) {
  const { chatRef } = params; // no await!

  if (!chatRef) {
    return NextResponse.json({ error: 'Missing chatRef' }, { status: 400 });
  }

  const body = await req.json();

  const response = await fetch(
    `${process.env.STAR_WARS_PUBLIC_API_URL}/message/${chatRef}`,
    {
      method: 'POST',
      headers: {
        'X-API-Key': process.env.API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
