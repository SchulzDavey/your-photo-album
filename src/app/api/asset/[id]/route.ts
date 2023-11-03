import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';

export async function DELETE(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  await prisma.asset.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}

export async function PATCH(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const { image, albumId } = await response.json();

  if (!albumId) {
    const updatedAssetWithFilter = await prisma.asset.update({
      where: {
        id: params.id,
      },
      data: {
        url: image.url,
      },
    });

    return NextResponse.json(updatedAssetWithFilter, { status: 200 });
  } else {
    const updatedAsset = await prisma.asset.update({
      where: {
        id: params.id,
      },
      data: {
        albumId,
      },
    });

    return NextResponse.json(updatedAsset, { status: 200 });
  }
}
