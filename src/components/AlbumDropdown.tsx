'use client';

import { Album } from '@prisma/client';
import Link from 'next/link';
import CreateAlbumButton from './CreateAlbumButton';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

const AlbumDropdown = ({ albums }: { albums: Album[] }) => {
  return (
    <>
      <DropdownMenuContent>
        <DropdownMenuLabel>Albums</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {albums.map((album) => (
          <DropdownMenuItem className="cursor-pointer" key={album.id}>
            <Link className="w-full" href={`/albums/${album.id}`}>
              {album.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <CreateAlbumButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/albums">Bekijk Alle Albums</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};

export default AlbumDropdown;
