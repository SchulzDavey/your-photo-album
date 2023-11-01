'use client';

import CloudinaryImage from '@/src/components/CloudinaryImage';
import { SearchResult } from './page';
import ImageGrid from '@/src/components/ImageGrid';
import { Asset } from '@prisma/client';

const AlbumGrid = ({ images }: { images: Asset[] }) => {
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

export default AlbumGrid;
