import cloudinary from 'cloudinary';
import AlbumGrid from './AlbumGrid';
import UploadButton from '../../gallery/UploadButton';
import { getServerSession } from 'next-auth';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';
import { useSearchParams } from 'next/navigation';

export type SearchResult = {
  public_id: string;
  tags: string[];
};

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
      userId: session?.user?.id,
      albumId: path,
    },
  });

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Album {album?.name}</h1>
        <UploadButton />
      </div>
      <AlbumGrid assets={assets} />
    </section>
  );
};

export default GalleryPage;
