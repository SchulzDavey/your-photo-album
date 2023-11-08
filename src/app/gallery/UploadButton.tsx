'use client';

import { Button } from '@/src/components/ui/button';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const UploadButton = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <Button asChild>
      <div className="flex gap-2 items-center">
        <CldUploadButton
          onUpload={async (image) => {
            await axios
              .post('/api/asset', { image, params })
              .then((response) => {
                router.refresh();
                toast.success('Asset successfully uploaded!');
              });
          }}
          uploadPreset="ts3tuyxs"
        />
      </div>
    </Button>
  );
};

export default UploadButton;
