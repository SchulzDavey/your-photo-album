'use client';

import { Asset } from '@prisma/client';
import Image from 'next/image';

const UpdatedImage = ({
  asset,
  updatedImage,
}: {
  asset: Asset;
  updatedImage: string;
}) => {
  if (!updatedImage) return;

  return (
    <Image
      src={updatedImage}
      alt="joehoe"
      width={asset.width!}
      height={asset.height!}
    />
  );
};

export default UpdatedImage;
