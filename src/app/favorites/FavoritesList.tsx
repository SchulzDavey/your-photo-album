'use client';

import { useEffect, useState } from 'react';
import CloudinaryImage from '../../components/CloudinaryImage';
import ImageGrid from '@/src/components/ImageGrid';
import { Asset } from '@prisma/client';

const FavoritesList = ({ initialResources }: { initialResources: Asset[] }) => {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(image: Asset) => {
        return (
          <CloudinaryImage
            key={image.id}
            image={image}
            alt="an image of something"
            width="400"
            height="300"
            onUnheart={(unheartedResource: Asset) => {
              return setResources(
                resources.filter(
                  (resource) => resource.id != unheartedResource.id
                )
              );
            }}
          />
        );
      }}
    />
  );
};

export default FavoritesList;
