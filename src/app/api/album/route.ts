import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../auth/[...nextauth]/authOptions';
import { albumSchema } from '../../schemas/albumSchema';
import prisma from '@/prisma/client';
import cloudinary from 'cloudinary';

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const body = await request.json();
  const validation = albumSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const createAlbum = await cloudinary.v2.api.create_folder(body.albumName);

  const existingAlbum = await prisma.album.findMany({
    where: {
      name: createAlbum.name,
    },
  });

  if (existingAlbum.length != 0) {
    const updatedAsset = await prisma.asset.update({
      where: {
        id: body.asset.id,
      },
      data: {
        albumId: existingAlbum[0].id,
      },
    });

    return NextResponse.json({ updatedAsset }, { status: 200 });
  } else {
    const album = await prisma.album.create({
      data: {
        name: createAlbum.name,
        userId: user?.id,
        assetId: body.asset.id,
      },
    });

    const updatedAsset = await prisma.asset.update({
      where: {
        id: body.asset.id,
      },
      data: {
        albumId: album.id,
      },
    });

    return NextResponse.json({ album, updatedAsset }, { status: 200 });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const body = await request.json();

  const albums = await prisma.album.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return NextResponse.json({ albums }, { status: 200 });
}
