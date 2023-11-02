'use client';

import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Album } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AlbumCard = ({ album }: { album: Album }) => {
  const router = useRouter();

  const deleteAlbum = async (data: Album) => {
    await axios.delete('/api/album/' + data.id).then((response) => {
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{album.name}</CardTitle>
        <CardDescription>Show all your {album.name} images</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="w-full flex flex-col justify-between gap-3">
        <Button className="w-full" asChild>
          <Link href={`/albums/${album.id}`}>Vieuw Album</Link>
        </Button>
        <Button
          onClick={() => deleteAlbum(album)}
          className="w-full"
          variant="destructive"
        >
          Delete Album
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
