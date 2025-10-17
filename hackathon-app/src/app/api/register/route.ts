import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Utility to generate the next user ID matching pattern "P" + 4 digits
async function generateUserId(): Promise<string> {
  // Get last created user ID by descending order (assuming user_id stored as string)
  const lastUser = await prisma.user.findFirst({
    orderBy: { user_id: 'desc' },
    select: { user_id: true },
  });

  if (!lastUser) {
    return 'P0001'; // Initial ID if none exists
  }

  // Extract numeric part and increment
  const lastNum = parseInt(lastUser.user_id.slice(1), 10);
  const nextNum = lastNum + 1;

  // Zero-pad the number to length 4
  const nextNumStr = nextNum.toString().padStart(4, '0');

  return `P${nextNumStr}`;
}

export async function POST(request: NextRequest) {
  const { name, username, email, password } = await request.json();

  if (!name || !username || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Validate email and username uniqueness
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email or username already taken' }, { status: 409 });
    }

    // Generate new user ID with pattern "P" + 4 digit number
    const user_id = await generateUserId();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        user_id, // custom generated ID
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
