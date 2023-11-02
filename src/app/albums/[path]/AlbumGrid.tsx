'use client';

import CloudinaryImage from '@/src/components/CloudinaryImage';
import ImageGrid from '@/src/components/ImageGrid';
import { Asset } from '@prisma/client';

const AlbumGrid = ({ assets }: { assets: Asset[] }) => {
  return (
    <ImageGrid
      images={assets}
      getImage={(asset: Asset) => {
        return (
          <CloudinaryImage
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
