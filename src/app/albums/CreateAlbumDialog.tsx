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
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export type CreateAlbumProps = {
  albumName: string;
};

const CreateAlbumDialog = ({
  albumDialog,
  setAlbumDialog,
}: {
  albumDialog: boolean;
  setAlbumDialog: (value: boolean) => void;
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
        albumName,
      })
      .then((response: any) => {
        router.refresh();
        setAlbumDialog(false);
        toast.success('Album created successfully!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error has been occurred. Try again.');
      });
  };

  return (
    <Dialog onOpenChange={() => setAlbumDialog(false)} open={albumDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Album</DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlbumDialog;
