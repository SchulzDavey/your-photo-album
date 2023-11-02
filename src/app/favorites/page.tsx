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

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Favorites Images</h1>
        <UploadButton />
      </div>
      <FavoritesList assets={assets} />
    </section>
  );
};

export default FavoritesPage;
