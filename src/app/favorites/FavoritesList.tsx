"use client";

import { useState } from "react";
import CloudinaryImage from "../gallery/CloudinaryImage";
import { SearchResult } from "../gallery/page";

const FavoritesList = ({
  initialResources,
}: {
  initialResources: SearchResult[];
}) => {
  const [resources, setResources] = useState(initialResources);

  return (
    <div className="grid grid-cols-4 gap-4">
      {resources.map((result) => (
        <div key={result.public_id}>
          <CloudinaryImage
            key={result.public_id}
            imagedata={result}
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
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
