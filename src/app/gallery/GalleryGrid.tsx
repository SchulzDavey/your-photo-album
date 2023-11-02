'use client';

import ImageGrid from '@/src/components/ImageGrid';
import { Album, Asset } from '@prisma/client';
import CloudinaryImage from '../../components/CloudinaryImage';

const GalleryGrid = ({
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
            key={asset.id}
            albums={albums}
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
