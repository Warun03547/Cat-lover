import { NextResponse } from 'next/server';

export async function GET() {
  const randomQuery = Math.floor(Math.random() * 100000);
  return NextResponse.json({ url: `https://cataas.com/cat?${randomQuery}` });
}
