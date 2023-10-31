"use server";

import cloudinary from "cloudinary";

const SetAsFavoriteAction = async (publicId: string, isFavorite: boolean) => {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
};

export default SetAsFavoriteAction;
