import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtAndAuthorize } from '@/lib/auth'; 
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      const game = await prisma.game.findUnique({
        where: { id },
        include: {
          score: true,
          teams: true,
          comments: true,
          tournament: true,
        },
      });
      if (!game) {
        return NextResponse.json({ error: 'Game not found' }, { status: 404 });
      }
      return NextResponse.json(game);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Error fetching game' }, { status: 500 });
    }
  }

  export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const auth = verifyJwtAndAuthorize(request, ['ADMIN', 'ORGANIZER']);
    if (auth instanceof NextResponse) return auth;
  
    const data = await request.json();
  
    try {
      const updateData: any = {
        location: data.location,
        date: data.date ? new Date(data.date) : undefined,
        duration: data.duration,
        referee: data.referee,
        season: data.season,
        rating: data.rating,
      };
  
      const updated = await prisma.game.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json(updated);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Error updating game' }, { status: 500 });
    }
  }

  export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
    if (auth instanceof NextResponse) return auth;
  
    try {
      await prisma.game.delete({ where: { id } });
      return NextResponse.json({ message: 'Game deleted' });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Error deleting game' }, { status: 500 });
    }
  }
  
  
