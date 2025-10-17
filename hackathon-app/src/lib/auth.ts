import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  userId: string;
  role: string;
}

export function verifyJwtAndAuthorize(
  request: NextRequest,
  allowedRoles: string[]
): { user: AuthUser } | NextResponse {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Access forbidden: no token' }, { status: 403 });
  }

  try {
    // Verify JWT and decode payload
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    if (!allowedRoles.includes(decoded.role)) {
      return NextResponse.json({ message: 'Access forbidden: insufficient permissions' }, { status: 403 });
    }

    // Return user info if authorized
    return { user: decoded };
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
  }
}
