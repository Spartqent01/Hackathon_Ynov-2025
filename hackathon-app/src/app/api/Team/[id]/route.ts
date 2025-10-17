import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwtAndAuthorize } from '@/lib/auth';

// GET /api/teams/[id] - Get team by ID with players and games
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(id) },
      include: {
        players: {
          include: {
            user: true,
          },
        },
        games: true,
      },
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

// PATCH /api/teams/[id] - Update team info (admins only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;

  try {
    const data = await request.json();

    // Exclude color update because color is game-specific
    const updateData: {} = {};

    // (Add other updatable fields here if you want)

    const updatedTeam = await prisma.team.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

// DELETE /api/teams/[id] - Delete team (admins only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;

  try {
    await prisma.team.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Team deleted' });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}
