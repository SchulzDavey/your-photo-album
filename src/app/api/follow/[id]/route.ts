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

  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }

  // const updatedFollowUser = await prisma.follower.create({
  //   data: {
  //     userId: (session?.user as User)?.id,
  //     followedUserId: params.id,
  //     followed: true,
  //   },
  // });

  // const userWithFollowers = await prisma.user.findUnique({
  //   where: {
  //     id: params.id,
  //   },
  //   include: {
  //     Follower: {
  //       include: {
  //         user: true,
  //       },
  //     },
  //   },
  // });

  // console.log(userWithFollowers);

  // return NextResponse.json(updatedFollowUser, { status: 200 });
}
