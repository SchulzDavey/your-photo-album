'use client';

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: 'success';
};

export default function Home() {
  const [imageId, setImageId] = useState('');

  return (
    <main className="pt-8 flex flex-col gap-8">
      <h1>Hallo!</h1>
    </main>
  );
}
