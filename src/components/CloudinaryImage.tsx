"use client";

import { HeartIcon } from "lucide-react";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState, useTransition } from "react";
import SetAsFavoriteAction from "../app/gallery/actions";
import { SearchResult } from "../app/gallery/page";
import ImageMenu from "./ImageMenu";

const CloudinaryImage = (
  props: {
    image: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) => {
  const { image, onUnheart } = props;

  const [transition, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(
    image.tags.includes("favorite")
  );

  return (
    <div className="relative">
      <CldImage {...props} src={image.public_id} alt="This is a new" />
      {isFavorited ? (
        <HeartIcon
          onClick={() => {
            onUnheart?.(image);
            setIsFavorited(false);
            startTransition(() => {
              SetAsFavoriteAction(image.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <HeartIcon
          onClick={() => {
            startTransition(() => {
              setIsFavorited(true);
              SetAsFavoriteAction(image.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu image={image} />
    </div>
  );
};

export default CloudinaryImage;
