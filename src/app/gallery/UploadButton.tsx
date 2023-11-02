'use client';

import { Button } from '@/src/components/ui/button';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

const UploadButton = () => {
  const router = useRouter();

  return (
    <Button asChild>
      <div className="flex gap-2 items-center">
        <CldUploadButton
          onUpload={async (image) => {
            await axios.post('/api/asset', image).then((response) => {
              console.log(response);
              router.refresh();
            });
          }}
          uploadPreset="v0u9n21m"
        />
      </div>
    </Button>
  );
};

export default UploadButton;
