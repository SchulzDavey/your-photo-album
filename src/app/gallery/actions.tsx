"use server";

import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

const SetAsFavoriteAction = async (publicId: string, isFavorite: boolean) => {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  revalidatePath("/gallery");
};

export default SetAsFavoriteAction;
