import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwtAndAuthorize } from '@/lib/auth';

// GET /api/scores/[gameId] - Get score by game ID
export async function GET(request: NextRequest, { params }: { params: { gameId: string } }) {
  const { gameId } = params;

  try {
    const score = await prisma.score.findUnique({
      where: { gameId: Number(gameId) },
    });

    if (!score) {
      return NextResponse.json({ error: 'Score not found' }, { status: 404 });
    }

    return NextResponse.json(score);
  } catch (error) {
    console.error('Error fetching score:', error);
    return NextResponse.json({ error: 'Failed to fetch score' }, { status: 500 });
  }
}

// PUT /api/scores/[gameId] - Create or update score for a game
export async function PUT(request: NextRequest, { params }: { params: { gameId: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { gameId } = params;

  try {
    const data = await request.json();

    // Validate required fields
    if (typeof data.red_score !== 'number' || typeof data.blue_score !== 'number' || !['RED', 'BLUE'].includes(data.winner)) {
      return NextResponse.json({ error: 'Invalid score data' }, { status: 400 });
    }

    // Upsert score (create if not exists, update if exists)
    const score = await prisma.score.upsert({
      where: { gameId: Number(gameId) },
      update: {
        red_score: data.red_score,
        blue_score: data.blue_score,
        winner: data.winner,
      },
      create: {
        gameId: Number(gameId),
        red_score: data.red_score,
        blue_score: data.blue_score,
        winner: data.winner,
      },
    });

    return NextResponse.json(score);
  } catch (error) {
    console.error('Error creating/updating score:', error);
    return NextResponse.json({ error: 'Failed to create/update score' }, { status: 500 });
  }
}

// DELETE /api/scores/[gameId] - Delete score for a game
export async function DELETE(request: NextRequest, { params }: { params: { gameId: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { gameId } = params;

  try {
    await prisma.score.delete({ where: { gameId: Number(gameId) } });
    return NextResponse.json({ message: 'Score deleted' });
  } catch (error) {
    console.error('Error deleting score:', error);
    return NextResponse.json({ error: 'Failed to delete score' }, { status: 500 });
  }
}
