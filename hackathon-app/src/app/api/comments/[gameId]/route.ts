import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwtAndAuthorize } from '@/lib/auth';

// GET /api/comments/[gameId] - get all comments for a game
export async function GET(request: NextRequest, { params }: { params: { gameId: string } }) {
  const { gameId } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: { gameId: Number(gameId) },
      include: {
        user: { select: { username: true, name: true } },
      },
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/comments/[gameId] - add a comment to a game
export async function POST(request: NextRequest, { params }: { params: { gameId: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN', 'USER']);
  if (auth instanceof NextResponse) return auth;

  const { user } = auth;  
  const { gameId } = params;

  try {
    const { player_comment } = await request.json();

    if (!player_comment || typeof player_comment !== 'string') {
      return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        gameId: Number(gameId),
        userId: user.userId,
        player_comment,
      },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

// DELETE /api/comments/[id] - delete a comment
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyJwtAndAuthorize(request, ['ADMIN']);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;

  try {
    await prisma.comment.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
