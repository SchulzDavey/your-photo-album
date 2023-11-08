'use client';

import { Button } from '@/src/components/ui/button';
import axios from 'axios';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import EditMenu from './EditMenu';
import UpdatedImage from './UpdatedImage';

type EditorProps = {
  asset: any;
  publicId: string;
};

const Editor = ({ asset, publicId }: EditorProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>();
  const [updatedImage, setUpdatedImage] = useState<any>('');

  const addFilterToImage = (filter: string, promptValue?: string) => {
    let editedImage;

    switch (filter) {
      case 'none':
        editedImage = getCldImageUrl({
          src: asset.url!,
          height: asset.height!,
          width: asset.width!,
        });
        break;

      case 'blur':
        editedImage = getCldImageUrl({
          src: asset.url!,
          height: asset.height!,
          width: asset.width!,
          blur: 1000,
        });
        break;

      case 'grayscale':
        editedImage = getCldImageUrl({
          src: asset.url!,
          height: asset.height!,
          width: asset.width!,
          grayscale: true,
        });
        break;

      case 'pixelate':
        editedImage = getCldImageUrl({
          src: asset.url!,
          height: asset.height!,
          width: asset.width!,
          pixelate: true,
        });
        break;
    }

    setFilter(filter);
    setUpdatedImage(editedImage!);
  };

  const uploadImage = async (image: { image: { url: string } }) => {
    await axios
      .patch('/api/asset/' + asset.id, {
        image: {
          url: image,
        },
      })
      .then((response) => {
        router.refresh();
        toast.success('Asset successfully edited!');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="w-full flex items-start">
        <EditMenu
          filter={filter!}
          setFilter={setFilter}
          addFilterToImage={addFilterToImage}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Image
          width={350}
          height={350}
          src={asset.url!}
          alt="This is a cool image"
        />
        <div className="flex flex-col gap-3">
          <UpdatedImage updatedImage={updatedImage} />
          {filter !== undefined && (
            <Button onClick={() => uploadImage(updatedImage)}>Bewerken</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
