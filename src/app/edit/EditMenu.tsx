'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

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
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdownMenuLabel>Add Filter</DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {filter === undefined
              ? 'None'
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
