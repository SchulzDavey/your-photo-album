'use client';

import ImageGrid from '@/src/components/ImageGrid';
import { Asset } from '@prisma/client';
import CloudinaryImage from '../../components/CloudinaryImage';

const GalleryGrid = ({ images }: { images: Asset[] }) => {
  return (
    <ImageGrid
      images={images}
      getImage={(image: Asset) => {
        return (
          <CloudinaryImage
            key={image.id}
            image={image}
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
