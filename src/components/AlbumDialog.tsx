import { Asset } from '@prisma/client';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AlbumDialog = ({
  asset,
  onClose,
  albumDialog,
}: {
  asset: Asset;
  onClose: () => void;
  albumDialog: boolean;
}) => {
  const router = useRouter();
  const [albumName, setAlbumName] = useState('');

  const createAlbum = async (asset: any, albumName: any) => {
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
          <DialogTitle>Add to album</DialogTitle>
          <DialogDescription>
            Type an album you want to move this image into
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="album-name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => setAlbumName(e.currentTarget.value)}
              id="album-name"
              defaultValue={albumName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              createAlbum(asset, albumName);
              onClose();
            }}
            type="submit"
          >
            Add to Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
