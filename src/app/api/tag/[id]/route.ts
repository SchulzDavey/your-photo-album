import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';

export async function PATCH(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const { tags } = await response.json();

  const asset = await prisma.asset.findUnique({
    where: {
      id: params.id,
    },
  });

  const assetTags = [...(asset?.tags || [])];
  assetTags.push('favorite');

  try {
    const updatedAssetTags = await prisma.asset.update({
      where: {
        id: params.id,
      },
      data: {
        tags: assetTags,
      },
    });

    return NextResponse.json({ updatedAssetTags }, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'An error has occured' + error });
  }
}
