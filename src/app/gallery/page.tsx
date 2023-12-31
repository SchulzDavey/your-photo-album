import prisma from '@/prisma/client';
import SearchForm from '@/src/components/SearchForm';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import GalleryGrid from './GalleryGrid';
import UploadButton from './UploadButton';
import { User } from '@prisma/client';

const GalleryPage = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const session = await getServerSession(authOptions);
  const results = await prisma.asset.findMany({
    where: {
      userId: (session?.user as User)?.id,
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
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <SearchForm initialSearch={search} />
      <GalleryGrid albums={albums} assets={results} />
    </section>
  );
};

export default GalleryPage;
