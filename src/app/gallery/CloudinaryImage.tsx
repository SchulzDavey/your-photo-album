"use client";

import FullHeart from "@/components/icons/FullHeart";
import Heart from "@/components/icons/Heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState, useTransition } from "react";
import SetAsFavoriteAction from "./actions";
import { SearchResult } from "./page";

const CloudinaryImage = (
  props: {
    imagedata: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) => {
  const { imagedata, onUnheart } = props;

  const [transition, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(
    imagedata.tags.includes("favorite")
  );

  return (
    <div className="relative">
      <CldImage {...props} src={imagedata.public_id} alt="This is a new" />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imagedata);
            setIsFavorited(false);
            startTransition(() => {
              SetAsFavoriteAction(imagedata.public_id, false);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTransition(() => {
              setIsFavorited(true);
              SetAsFavoriteAction(imagedata.public_id, true);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default CloudinaryImage;
