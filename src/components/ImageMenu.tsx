import { Asset } from '@prisma/client';
import { FolderPlus, MenuIcon, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AlbumDialog from './AlbumDialog';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const ImageMenu = ({ asset }: { asset: Asset }) => {
  const [open, setOpen] = useState(false);
  const [albumDialog, setAlbumDialog] = useState(false);

  return (
    <>
      <div className="absolute top-2 right-2">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem asChild>
              <div
                onClick={() => {
                  setAlbumDialog(true);
                }}
                className="flex justify-between"
              >
                <FolderPlus className="w-5 h-5" />
                <p className="text-md">Add to Album</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="flex justify-between"
                href={`/edit?publicId=${encodeURIComponent(asset.id)}`}
              >
                <Pencil className="w-5 h-5" />
                <p className="text-md">Edit Image</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlbumDialog
        asset={asset}
        albumDialog={albumDialog}
        onClose={() => setAlbumDialog(false)}
      />
    </>
  );
};

export default ImageMenu;
