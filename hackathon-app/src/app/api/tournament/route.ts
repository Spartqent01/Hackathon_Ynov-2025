import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwtAndAuthorize } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: { games: true }, 
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json({ error: 'Failed to fetch tournaments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();

    if (!data.name || !data.date) {
      return NextResponse.json({ error: 'Name and date are required' }, { status: 400 });
    }

    const newTournament = await prisma.tournament.create({
      data: {
        name: data.name,
        date: new Date(data.date),
      },
    });

    return NextResponse.json(newTournament, { status: 201 });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json({ error: 'Failed to create tournament' }, { status: 500 });
  }
}
