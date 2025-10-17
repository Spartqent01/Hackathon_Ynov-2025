import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwtAndAuthorize } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: Number(id) },
      include: { games: true },
    });

    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    return NextResponse.json(tournament);
  } catch (error) {
    console.error('Error fetching tournament:', error);
    return NextResponse.json({ error: 'Failed to fetch tournament' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;

  try {
    const data = await request.json();

    const updateData: { name?: string; date?: Date } = {};
    if (typeof data.name === 'string') updateData.name = data.name;
    if (data.date) updateData.date = new Date(data.date);

    const updatedTournament = await prisma.tournament.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedTournament);
  } catch (error) {
    console.error('Error updating tournament:', error);
    return NextResponse.json({ error: 'Failed to update tournament' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;

  try {
    await prisma.tournament.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Tournament deleted' });
  } catch (error) {
    console.error('Error deleting tournament:', error);
    return NextResponse.json({ error: 'Failed to delete tournament' }, { status: 500 });
  }
}
