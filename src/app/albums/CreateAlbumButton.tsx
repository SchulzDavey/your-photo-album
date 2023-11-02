'use client';

import { Button } from '@/src/components/ui/button';
import CreateAlbumDialog from './CreateAlbumDialog';
import { useState } from 'react';

const CreateAlbumButton = () => {
  const [albumDialog, setAlbumDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setAlbumDialog(true)} className="cursor-pointer">
        Create a album
      </Button>
      <CreateAlbumDialog
        albumDialog={albumDialog}
        setAlbumDialog={setAlbumDialog}
      />
    </>
  );
};

export default CreateAlbumButton;
