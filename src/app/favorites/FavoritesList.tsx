"use client";

import { useEffect, useState } from "react";
import CloudinaryImage from "../../components/CloudinaryImage";
import { SearchResult } from "../gallery/page";
import ImageGrid from "@/components/ImageGrid";

const FavoritesList = ({
  initialResources,
}: {
  initialResources: SearchResult[];
}) => {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(image: SearchResult) => {
        return (
          <CloudinaryImage
            key={image.public_id}
            image={image}
            alt="an image of something"
            width="400"
            height="300"
            onUnheart={(unheartedResource: SearchResult) => {
              return setResources(
                resources.filter(
                  (resource) =>
                    resource.public_id != unheartedResource.public_id
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
