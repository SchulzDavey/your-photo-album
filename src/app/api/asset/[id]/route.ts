import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';

export async function DELETE(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  try {
    await prisma.asset.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'An error has occured' + error });
  }
}

export async function PATCH(
  response: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const { image } = await response.json();

  try {
    const updatedAssetWithFilter = await prisma.asset.update({
      where: {
        id: params.id,
      },
      data: {
        url: image.url,
      },
    });

    return NextResponse.json(updatedAssetWithFilter, { status: 200 });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'An error has occured' + error });
  }
}
