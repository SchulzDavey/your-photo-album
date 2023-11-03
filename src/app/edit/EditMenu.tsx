'use client';

import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useState } from 'react';

const EditMenu = ({
  filter,
  addFilterToImage,
}: {
  filter: string;
  setFilter: (
    filter: undefined | 'generative-fill' | 'blur' | 'grayscale' | 'pixelate'
  ) => void;
  addFilterToImage: (filter: string) => void;
}) => {
  const [openPrompt, setOpenPrompt] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Add Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {filter === undefined ? 'None' : filter}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenPrompt(true);
            }}
            className="cursor-pointer"
          >
            Generative Fill
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              addFilterToImage('blur');
            }}
          >
            Blur
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              addFilterToImage('grayscale');
            }}
          >
            Grayscale
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              addFilterToImage('pixelate');
            }}
          >
            Pixelate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default EditMenu;
