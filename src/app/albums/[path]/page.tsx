import prisma from '@/prisma/client';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import UploadButton from '../../gallery/UploadButton';
import AlbumGrid from './AlbumGrid';

const GalleryPage = async ({
  params: { path },
}: {
  params: { path: string };
}) => {
  const session = await getServerSession(authOptions);
  const album = await prisma.album.findUnique({
    where: {
      id: path,
    },
  });
  const assets = await prisma.asset.findMany({
    where: {
      userId: (session?.user as User)?.id,
      albumId: path,
    },
  });
  const albums = await prisma.album.findMany({
    where: {
      userId: (session?.user as User)?.id,
    },
  });

  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Album {album?.name}</h1>
        <UploadButton />
      </div>
      <AlbumGrid albums={albums} assets={assets} />
    </section>
  );
};

export default GalleryPage;
