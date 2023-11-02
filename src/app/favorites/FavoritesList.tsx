'use client';

import { useEffect, useState } from 'react';
import CloudinaryImage from '../../components/CloudinaryImage';
import ImageGrid from '@/src/components/ImageGrid';
import { Asset } from '@prisma/client';

const FavoritesList = ({ assets }: { assets: Asset[] }) => {
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
