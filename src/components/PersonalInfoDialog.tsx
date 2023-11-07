import { setActiveLink } from '@/redux/features/link-slice';
import { AppDispatch, useLinkSelector } from '@/redux/store';
import { User } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const PersonalInfoDialog = ({ user }: { user: User | UserProps }) => {
  const { data, update } = useSession();

  const router = useRouter();
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
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

  const openFileUpload = () => {
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
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
            <div onClick={openFileUpload}>
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={
                    profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : user?.image!
                  }
                />
                <AvatarFallback>
                  {user?.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={(e) => {
                  setProfilePicture(e.target.files![0]);
                }}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
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
