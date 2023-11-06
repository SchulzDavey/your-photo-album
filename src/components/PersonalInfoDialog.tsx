import { setActiveLink } from '@/redux/features/link-slice';
import { AppDispatch, useLinkSelector } from '@/redux/store';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { UserProps } from './Header';
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
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import cloudinary from 'cloudinary';
import { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

const PersonalInfoDialog = ({ user }: { user: User | UserProps }) => {
  const { data, update } = useSession();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [profilePicture, setProfilePicture] = useState<File | undefined>(
    undefined
  );
  const activeLink = useLinkSelector((state) => state.linkReducer.activeLink);

  const updatePersonalInfo = async (data: User | UserProps) => {
    const formData = new FormData();
    const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_PROFILE_PRESET!
    );
    formData.append('file', profilePicture!);

    const { url } = await axios
      .post(uploadUrl, formData)
      .then((response) => response.data);

    await axios
      .patch(`/api/user/${user?.email}`, {
        userData: {
          name: data?.name,
          picture: url,
        },
      })
      .then((response) => {
        router.refresh();
      })
      .catch((error) => console.error(error));

    await update({
      userData: {
        name: data?.name,
        picture: url,
      },
    })
      .then((response) => {
        dispatch(setActiveLink(''));
        router.refresh();
        toast.success('User Information Updated');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Dialog
      onOpenChange={() => dispatch(setActiveLink(''))}
      open={activeLink === 'personal-info'}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when your done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(updatePersonalInfo)}>
          <div className="grid gap-4 py-4">
            <div>
              {/* <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback>
                  {user?.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar> */}
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setProfilePicture(e.target.files?.[0]);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                {...register('name')}
                required
                id="name"
                defaultValue={user?.name!}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoDialog;
