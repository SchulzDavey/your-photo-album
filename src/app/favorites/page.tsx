import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import UploadButton from '../gallery/UploadButton';
import FavoritesList from './FavoritesList';

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions);
  const assets = await prisma.asset.findMany({
    where: {
      userId: session?.user?.id,
      Tag: {
        some: {
          name: 'favorite',
        },
      },
    },
    include: {
      Tag: true,
    },
  });
  const albums = await prisma.album.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Favorites Images</h1>
        <UploadButton />
      </div>
      <FavoritesList albums={albums} assets={assets} />
    </section>
  );
};

export default FavoritesPage;
