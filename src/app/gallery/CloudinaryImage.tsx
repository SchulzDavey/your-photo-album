"use client";

import Heart from "@/components/icons/Heart";
import { CldImage } from "next-cloudinary";
import SetAsFavoriteAction from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";
import FullHeart from "@/components/icons/FullHeart";

const CloudinaryImage = (props: any, path: string) => {
  const [transition, startTransition] = useTransition();
  const isFavorited = props.tags.includes("favorite");

  return (
    <div className="relative">
      <CldImage {...props} src={props.public_id} />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            startTransition(() => {
              SetAsFavoriteAction(props.public_id, false, path);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTransition(() => {
              SetAsFavoriteAction(props.public_id, true, path);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default CloudinaryImage;
