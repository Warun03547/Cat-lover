import { NextRequest, NextResponse } from 'next/server';

const users = [
  { username: 'catlover1', password: 'meow123' },
  { username: 'admin', password: 'test' },
];

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  // const user = users.find(u => u.username === username && u.password === password);
  const user = {username, password};
  if (user) {
    return NextResponse.json({ token: 'mock-token', username });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
