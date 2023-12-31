import prisma from '@/prisma/client';
import CreateAlbumButton from '@/src/components/CreateAlbumButton';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import AlbumCard from './AlbumCard';
import { User } from '@prisma/client';

const AlbumsPage = async () => {
  const session = await getServerSession(authOptions);
  const albums = await prisma.album.findMany({
    where: {
      userId: (session?.user as User)?.id,
    },
  });

  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-5 justify-between">
        <h1 className="text-4xl font-bold">Albums</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {albums.length === 0 && <CreateAlbumButton />}
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default AlbumsPage;
