import cloudinary from 'cloudinary';
import GalleryGrid from './GalleryGrid';
import UploadButton from './UploadButton';
import SearchForm from '@/src/components/SearchForm';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/authOptions';

const GalleryPage = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const session = await getServerSession(authOptions);
  const results = await prisma.asset.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <SearchForm initialSearch={search} />
      <GalleryGrid images={results} />
    </section>
  );
};

export default GalleryPage;
