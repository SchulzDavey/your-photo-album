import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { followedUser } = await request.json();

  const existingFollowers = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Follower: true,
    },
  });

  const isFollowerAlreadyIncluded = existingFollowers?.Follower.map(
    (follow) => follow.userId === params.id
  )[0];

  if (isFollowerAlreadyIncluded) {
    await prisma.follower.deleteMany({
      where: {
        userId: params.id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } else {
    const updatedFollowUser = await prisma.follower.create({
      data: {
        userId: params.id,
        followedUserId: followedUser.id,
        followed: true,
      },
    });

    return NextResponse.json(updatedFollowUser, { status: 200 });
  }
}
