"use client";

import ImageGrid from "@/components/ImageGrid";
import CloudinaryImage from "@/components/CloudinaryImage";
import { SearchResult } from "./page";

const AlbumGrid = ({ images }: { images: SearchResult[] }) => {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
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
