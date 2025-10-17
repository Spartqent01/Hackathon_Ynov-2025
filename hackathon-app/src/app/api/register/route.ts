import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function generateUserId(): Promise<string> {
  const lastUser = await prisma.user.findFirst({
    orderBy: { user_id: 'desc' },
    select: { user_id: true },
  });

  if (!lastUser) {
    return 'P0001'; 
  }

  const lastNum = parseInt(lastUser.user_id.slice(1), 10);
  const nextNum = lastNum + 1;

  const nextNumStr = nextNum.toString().padStart(4, '0');

  return `P${nextNumStr}`;
}

export async function POST(request: NextRequest) {
  const { name, username, email, password } = await request.json();

  if (!name || !username || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email or username already taken' }, { status: 409 });
    }

    const user_id = await generateUserId();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        user_id, 
        name,
        username,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return NextResponse.json({
      message: 'User registered successfully',
      userId: newUser.user_id,
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
