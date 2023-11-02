'use client';

import { Album, Asset } from '@prisma/client';
import { HeartIcon } from 'lucide-react';
import { CldImage, CldImageProps } from 'next-cloudinary';
import { useState, useTransition } from 'react';
import SetAsFavoriteAction from '../app/gallery/actions';
import ImageMenu from './ImageMenu';

const CloudinaryImage = (
  props: {
    asset: Asset;
    albums: Album[];
    onUnheart?: (unheartedResource: Asset) => void;
  } & Omit<CldImageProps, 'src'>
) => {
  const { asset, onUnheart, albums } = props;

  const [transition, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(false);
  // const [isFavorited, setIsFavorited] = useState(
  //   image.tags.includes("favorite")
  // );

  return (
    <div className="relative">
      <CldImage {...props} src={asset.id} alt="This is a new" />
      {isFavorited ? (
        <HeartIcon
          onClick={() => {
            onUnheart?.(asset);
            setIsFavorited(false);
            startTransition(() => {
              SetAsFavoriteAction(asset.id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <HeartIcon
          onClick={() => {
            startTransition(() => {
              setIsFavorited(true);
              SetAsFavoriteAction(asset.id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu albums={albums} asset={asset} />
    </div>
  );
};

export default CloudinaryImage;
