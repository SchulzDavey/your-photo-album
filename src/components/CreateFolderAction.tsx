"use server";

import cloudinary from "cloudinary";
import { SearchResult } from "../app/gallery/page";

const AddImageToAlbum = async (image: SearchResult, folder: string) => {
  const existingFolder = await cloudinary.v2.api.create_folder(folder);

  let parts = image.public_id.split("/");

  if (parts.length > 1) {
    parts = parts.slice(1);
  }

  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(image.public_id, `${folder}/${publicId}`);
};

export default AddImageToAlbum;
