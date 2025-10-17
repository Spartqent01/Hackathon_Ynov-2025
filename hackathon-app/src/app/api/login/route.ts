import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../../../db'


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { email, password } = body;
  
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'Incorrect credentials' }, { status: 404 });
      }
  
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return NextResponse.json({ error: 'Incorrect credentials' }, { status: 401 });
      }
  
      // Create JWT payload
      const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      const response = NextResponse.json({
        message: 'Connection successful',
        userId: user.user_id,
        role: user.role,
      });
  
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 3600, 
      });
  
      return response;
  
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }