'use client';

import { setActiveLink } from '@/redux/features/link-slice';
import { AppDispatch } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';

const CreateAlbumButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <p
      className="cursor-pointer"
      onClick={() => dispatch(setActiveLink('new-album'))}
    >
      Nieuw Album
    </p>
  );
};

export default CreateAlbumButton;
