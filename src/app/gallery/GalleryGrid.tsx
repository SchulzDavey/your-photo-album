"use client";

import ImageGrid from "@/src/components/ImageGrid";
import CloudinaryImage from "../../components/CloudinaryImage";
import { SearchResult } from "./page";

const GalleryGrid = ({ images }: { images: SearchResult[] }) => {
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

export default GalleryGrid;
