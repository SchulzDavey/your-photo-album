'use client';

import ImageGrid from '@/src/components/ImageGrid';
import { Asset } from '@prisma/client';
import CloudinaryImage from '../../components/CloudinaryImage';

const GalleryGrid = ({ assets }: { assets: Asset[] }) => {
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

export default GalleryGrid;
