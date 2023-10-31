"use client";

import FullHeart from "@/components/icons/FullHeart";
import Heart from "@/components/icons/Heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState, useTransition } from "react";
import SetAsFavoriteAction from "../app/gallery/actions";
import { SearchResult } from "../app/gallery/page";
import ImageMenu from "./ImageMenu";

const CloudinaryImage = (
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) => {
  const { imageData, onUnheart } = props;

  const [transition, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} alt="This is a new" />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(() => {
              SetAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTransition(() => {
              setIsFavorited(true);
              SetAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu />
    </div>
  );
};

export default CloudinaryImage;
