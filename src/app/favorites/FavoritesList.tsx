'use client';

import ImageGrid from '@/src/components/ImageGrid';
import { Album, Asset } from '@prisma/client';
import { useEffect, useState } from 'react';
import CloudinaryImage from '../../components/CloudinaryImage';

const FavoritesList = ({
  assets,
  albums,
}: {
  assets: Asset[];
  albums: Album[];
}) => {
  const [resources, setResources] = useState(assets);

  useEffect(() => {
    setResources(assets);
  }, [assets]);

  return (
    <ImageGrid
      assets={resources}
      getImage={(asset: Asset) => {
        return (
          <CloudinaryImage
            key={asset.id}
            asset={asset}
            albums={albums}
            alt="an image of something"
            width="400"
            height="300"
          />
        );
      }}
    />
  );
};

export default FavoritesList;
