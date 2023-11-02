import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';

export async function PATCH(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'No user found' }, { status: 400 });
  }

  const body = await request.json();

  return NextResponse.json({}, {});
}
