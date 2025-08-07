import { NextRequest, NextResponse } from 'next/server';
import { Comment } from '@/app/types';

let comments: Comment[] = [];

export async function GET() {
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const { imageUrl, user, text } = await req.json();

  if (!imageUrl || !user || !text) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const newComment: Comment = { imageUrl, user, text };
  comments.push(newComment);

  return NextResponse.json({ message: 'Comment added' });
}
