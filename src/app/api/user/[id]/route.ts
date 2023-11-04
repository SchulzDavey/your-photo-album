import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'User not authenticated' },
      { status: 401 }
    );
  }

  if (session?.user?.email !== params.id) {
    return NextResponse.json(
      { message: 'Unauthorized action' },
      { status: 403 }
    );
  }

  const { userData } = await request.json();

  if (!userData || !userData.name) {
    return NextResponse.json(
      { message: 'Invalid input data' },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: params.id,
      },
      data: {
        name: userData.name,
      },
    });

    const updatedSession = {
      ...session,
      user: {
        ...session.user,
        name: userData.name,
      },
    };

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
