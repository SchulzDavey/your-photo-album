import { setActiveLink } from '@/redux/features/link-slice';
import { AppDispatch, useLinkSelector } from '@/redux/store';
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
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export type CreateAlbumProps = {
  albumName: string;
};

const CreateAlbumDialog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateAlbumProps>();
  const dispatch = useDispatch<AppDispatch>();
  const activeLink = useLinkSelector((state) => state.linkReducer.activeLink);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createAlbum = async ({ albumName }: CreateAlbumProps) => {
    await axios
      .post('/api/album', {
        albumName,
      })
      .then((response: any) => {
        router.refresh();
        dispatch(setActiveLink(''));
        toast.success('Album created successfully!');
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error has been occurred. Try');
      });
  };

  return (
    <Dialog
      onOpenChange={() => {
        setLoading(false);
        dispatch(setActiveLink(''));
      }}
      open={activeLink === 'new-album'}
    >
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
                className="col-span-3"
              />
            </div>
            <Button disabled={loading} type="submit">
              {!loading ? 'Create Album' : 'Loading...'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlbumDialog;
