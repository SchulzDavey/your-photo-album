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
    <main>
      <h1>Hallo!</h1>
    </main>
  );
}
