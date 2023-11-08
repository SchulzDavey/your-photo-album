import prisma from '@/prisma/client';
import { User } from '@prisma/client';
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
      id: (session?.user as User)?.id,
    },
  });

  const imageTags = [...(image.info.tags || [])];

  try {
    const addImage = await prisma.asset.create({
      data: {
        name: image.info.original_filename,
        width: image.info.width,
        height: image.info.height,
        url: image.info.url,
        media_type: image.info.resource_type,
        userId: user?.id,
        albumId: params.path,
        tags: imageTags,
      },
    });

    return NextResponse.json({ addImage }, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'An error has occured' + error });
  }
}
