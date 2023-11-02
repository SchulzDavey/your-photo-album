import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../auth/[...nextauth]/authOptions';

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'No user found' }, { status: 400 });
  }

  const { image, params } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const addImage = await prisma.asset.create({
    data: {
      id: image.info.public_id,
      url: image.info.url,
      media_type: image.info.resource_type,
      userId: user?.id,
      albumId: params.path,
    },
  });

  if (image.info.tags.length > 0) {
    for (const tag of image.info.tags) {
      await prisma.tag.create({
        data: {
          name: tag,
          asset: {
            connect: {
              id: image.info.public_id,
            },
          },
        },
      });
    }
  }

  return NextResponse.json({ addImage }, { status: 200 });
}
