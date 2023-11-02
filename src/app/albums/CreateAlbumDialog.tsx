import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateAlbumDialog = ({
  albumDialog,
  setAlbumDialog,
}: {
  albumDialog: boolean;
  setAlbumDialog: (value: boolean) => void;
}) => {
  const router = useRouter();
  const [albumName, setAlbumName] = useState('');

  const createAlbum = async (albumName: string) => {
    await axios
      .post('/api/album', {
        albumName,
      })
      .then((response: any) => {
        router.refresh();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog onOpenChange={() => setAlbumDialog(false)} open={albumDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Album</DialogTitle>
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
              createAlbum(albumName);
              setAlbumDialog(false);
            }}
            type="submit"
          >
            Create Album
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlbumDialog;
