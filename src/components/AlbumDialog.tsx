'use client';

import { Album, Asset, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AlbumSelect from './AlbumSelect';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserProps } from './Header';

const AlbumDialog = ({
  asset,
  albums,
  onClose,
  albumDialog,
}: {
  asset: Asset;
  albums: Album[];
  onClose: () => void;
  albumDialog: boolean;
}) => {
  const router = useRouter();
  const [albumName, setAlbumName] = useState('');

  const createAlbum = async (asset: any, albumName: string) => {
    await axios
      .post('/api/album', {
        asset,
        albumName,
      })
      .then((response: any) => {
        router.refresh();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog
      open={albumDialog}
      onOpenChange={(newOpenState) => {
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create or Move an Album</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="album-name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => {
                setAlbumName(e.currentTarget.value);
              }}
              id="album-name"
              defaultValue={albumName}
              className="col-span-3"
            />
          </div>
          <Button
            onClick={() => {
              createAlbum(asset, albumName);
              onClose();
            }}
            type="submit"
          >
            Create Album
          </Button>
        </div>
        <DialogFooter>
          <AlbumSelect onClose={onClose} albums={albums} asset={asset} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
