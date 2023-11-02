'use server';

import { Asset } from '@prisma/client';
import cloudinary from 'cloudinary';

const AddImageToAlbum = async (asset: Asset, folder: string) => {
  await cloudinary.v2.api.create_folder(folder);

  let parts = asset.id.split('/');

  if (parts.length > 1) {
    parts = parts.slice(1);
  }

  const publicId = parts.join('/');

  await cloudinary.v2.uploader.rename(asset.id, `${folder}/${publicId}`);
};

export default AddImageToAlbum;
