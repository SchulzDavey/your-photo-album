'use client';

import { Album, Asset } from '@prisma/client';
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
import { CreateAlbumProps } from './CreateAlbumDialog';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateAlbumProps>();
  const router = useRouter();
  const [albumName, setAlbumName] = useState('');

  const createAlbum = async ({ albumName }: CreateAlbumProps) => {
    await axios
      .post('/api/album', {
        asset,
        albumName,
      })
      .then((response: any) => {
        router.refresh();
        toast.success('Album created successfully!');
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error has occurred. Try again.');
      });
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
        <form onSubmit={handleSubmit(createAlbum)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="album-name" className="text-right">
                Album
              </Label>
              <Input
                {...register('albumName')}
                required
                id="album-name"
                defaultValue={albumName}
                className="col-span-3"
              />
            </div>
            <Button type="submit">Create Album</Button>
          </div>
        </form>
        {albums && albums.length > 0 && (
          <DialogFooter>
            <AlbumSelect onClose={onClose} albums={albums} asset={asset} />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
