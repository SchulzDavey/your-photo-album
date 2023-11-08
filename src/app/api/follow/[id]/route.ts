import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { User } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'No user found' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: (session?.user as User).id,
    },
  });

  const updatedFollowingIds = [...(user?.followingIds || [])];
  updatedFollowingIds.push(params.id);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: (session?.user as User)?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
