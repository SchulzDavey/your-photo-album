'use server';

import { Asset } from '@prisma/client';
import cloudinary from 'cloudinary';

const AddImageToAlbum = async (image: Asset, folder: string) => {
  const existingFolder = await cloudinary.v2.api.create_folder(folder);

  let parts = image.id.split('/');

  if (parts.length > 1) {
    parts = parts.slice(1);
  }

  const publicId = parts.join('/');

  await cloudinary.v2.uploader.rename(image.id, `${folder}/${publicId}`);
};

export default AddImageToAlbum;
