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
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import FilterPrompt from './FilterPrompt';

const EditPage = ({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) => {
  const [loading, setLoading] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [filter, setFilter] = useState<
    undefined | 'generative-fill' | 'blur' | 'grayscale' | 'pixelate'
  >();

  return (
    <section className="pt-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit {publicId}</h1>
      </div>
      <div className="flex flex-row gap-4">
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
              onClick={() => setFilter('blur')}
            >
              Blur
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setFilter('grayscale')}
            >
              Grayscale
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setFilter('pixelate')}
            >
              Pixelate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <FilterPrompt
          setFilter={setFilter}
          setOpenPrompt={setOpenPrompt}
          setPrompt={setPrompt}
          openPrompt={openPrompt}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CldImage
          width="800"
          height="800"
          src={publicId}
          alt="This is a cool image"
        />
        {filter && (
          <>
            {filter === 'generative-fill' && (
              <CldImage
                width="800"
                height="800"
                src={publicId}
                alt="This is a cool image"
                fillBackground={{
                  prompt: prompt,
                }}
                crop="pad"
              />
            )}

            {filter === 'blur' && (
              <CldImage
                width="800"
                height="800"
                src={publicId}
                alt="This is a cool image"
                blur="800"
              />
            )}

            {filter === 'grayscale' && (
              <CldImage
                width="800"
                height="800"
                src={publicId}
                alt="This is a cool image"
                grayscale
              />
            )}

            {filter === 'pixelate' && (
              <CldImage
                width="800"
                height="800"
                src={publicId}
                alt="This is a cool image"
                pixelate
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default EditPage;
