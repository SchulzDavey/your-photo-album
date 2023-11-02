'use client';

import CloudinaryImage from '@/src/components/CloudinaryImage';
import { UserProps } from '@/src/components/Header';
import ImageGrid from '@/src/components/ImageGrid';
import { Album, Asset, User } from '@prisma/client';

const AlbumGrid = ({
  assets,
  albums,
}: {
  assets: Asset[];
  albums: Album[];
}) => {
  return (
    <ImageGrid
      assets={assets}
      getImage={(asset: Asset) => {
        return (
          <CloudinaryImage
            albums={albums}
            key={asset.id}
            asset={asset}
            width="400"
            height="300"
            alt="An image of something"
          />
        );
      }}
    />
  );
};

export default AlbumGrid;
