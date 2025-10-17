import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwtAndAuthorize } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN', 'USER']);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();
    const players: { username: string; role: 'ATTACK' | 'DEFENSE' }[] = data.players;

    // Validate players array
    if (!players || !Array.isArray(players) || players.length === 0) {
      return NextResponse.json({ error: 'Players array is required' }, { status: 400 });
    }
    if (players.length > 2) {
      return NextResponse.json({ error: 'A team can have at most 2 players' }, { status: 400 });
    }

    // Validate roles
    const validRoles = ['ATTACK', 'DEFENSE'];
    for (const p of players) {
      if (!p.username || !p.role || !validRoles.includes(p.role)) {
        return NextResponse.json({ error: 'Each player must have a valid username and role' }, { status: 400 });
      }
    }

    // Find users by usernames
    const usernames = players.map(p => p.username);
    const users = await prisma.user.findMany({
      where: { username: { in: usernames } },
    });

    if (users.length !== players.length) {
      return NextResponse.json({ error: 'Some usernames not found' }, { status: 404 });
    }

    // Create the team
    const newTeam = await prisma.team.create({ data: {} });

    // Map usernames to user ids
    const userMap = new Map(users.map(u => [u.username, u.user_id]));

    // Create team members with roles as provided
    const teamMembers = players.map(p => ({
      userId: userMap.get(p.username)!,
      teamId: newTeam.id,
      role: p.role,
    }));

    await prisma.teamMember.createMany({ data: teamMembers });

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error('Error creating team with player roles:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
