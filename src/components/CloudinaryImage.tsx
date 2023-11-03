'use client';

import { Album, Asset, Tag } from '@prisma/client';
import axios from 'axios';
import { HeartIcon } from 'lucide-react';
import { CldImage, CldImageProps } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ImageMenu from './ImageMenu';
import { toast } from 'react-toastify';

const CloudinaryImage = (
  props: {
    asset: Asset;
    albums?: Album[];
  } & Omit<CldImageProps, 'src'>
) => {
  const { asset, albums } = props;

  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(
    asset?.Tag.some((tag: Tag) => tag.name === 'favorite')
  );

  const addToFavorites = async (data: any, tag: string) => {
    await axios
      .patch('/api/tag/' + data.id, { tag })
      .then((response) => {
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error has occurred. Try again.');
      });
  };

  return (
    <div className="relative">
      <CldImage {...props} src={asset.id} alt="This is a new" />
      {isFavorited ? (
        <HeartIcon
          onClick={() => {
            toast.error('Removed from favorites..');
            setIsFavorited(false);
            addToFavorites(asset, '');
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <HeartIcon
          onClick={() => {
            toast.success('Added to favorites!');
            setIsFavorited(true);
            addToFavorites(asset, 'favorite');
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu albums={albums!} asset={asset} />
    </div>
  );
};

export default CloudinaryImage;
