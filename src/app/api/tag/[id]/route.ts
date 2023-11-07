import prisma from '@/prisma/client';
import cloudinary from 'cloudinary';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'No user found' }, { status: 400 });
  }

  const body = await request.json();

  body.tag === 'favorite'
    ? await cloudinary.v2.uploader.add_tag('favorite', [params.id])
    : await cloudinary.v2.uploader.remove_tag('favorite', [params.id]);

  const asset = await prisma.asset.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Tag: true,
    },
  });

  const filteredAssets = asset?.Tag.filter((tag) => tag.name === 'favorite');

  let updatedTag;

  if (filteredAssets?.some((tag) => tag.name === 'favorite')) {
    updatedTag = await prisma.tag.deleteMany({
      where: {
        name: 'favorite',
        assetId: params.id,
      },
    });
  } else {
    updatedTag = await prisma.tag.create({
      data: {
        name: body.tag,
        asset: {
          connect: {
            id: params.id,
          },
        },
      },
    });
  }

  return NextResponse.json(updatedTag, { status: 200 });
}
