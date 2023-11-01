"use client";

import CloudinaryImage from "@/src/components/CloudinaryImage";
import { SearchResult } from "./page";
import ImageGrid from "@/src/components/ImageGrid";

const AlbumGrid = ({ images }: { images: SearchResult[] }) => {
  return (
    <ImageGrid
      images={images}
      getImage={(image: SearchResult) => {
        return (
          <CloudinaryImage
            key={image.public_id}
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
