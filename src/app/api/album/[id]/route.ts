import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  await prisma.album.delete({
    where: {
      id: params.id,
    },
  });

  const updatedAssets = await prisma.asset.updateMany({
    where: {
      albumId: params.id,
    },
    data: {
      albumId: '',
    },
  });

  return NextResponse.json({ updatedAssets }, { status: 200 });
}
