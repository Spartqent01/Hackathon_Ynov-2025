import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { } }) {

  const data = await request.json();

  try {
    const newGame = await prisma.game.create({
      data: {
        id: data.id,
        date: new Date(data.date),
        location: data.location,
        duration: data.duration,
        referee: data.referee,
        season: data.season,
        rating: data.rating,
        tournamentId: data.tournamentId,
      },
    });
    return NextResponse.json(newGame);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error creating game' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
      const games = await prisma.game.findMany({
        include: {
          score: true,
          teams: true,
          comments: true,
          tournament: true,
        }
      });
      return NextResponse.json(games);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Error fetching games' }, { status: 500 });
    }
  }
  