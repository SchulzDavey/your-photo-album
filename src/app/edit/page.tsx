"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

const EditPage = ({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) => {
  const [filter, setFilter] = useState<
    undefined | "generative-fill" | "blur" | "grayscale" | "pixelate"
  >();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setFilter(undefined)} variant="secondary">
            Clear All
          </Button>
          <Button
            onClick={() => setFilter("generative-fill")}
            variant="secondary"
          >
            Apply Generative Fill
          </Button>
          <Button onClick={() => setFilter("blur")} variant="secondary">
            Apply Blur
          </Button>
          <Button onClick={() => setFilter("grayscale")} variant="secondary">
            Apply Grayscale
          </Button>
          <Button onClick={() => setFilter("pixelate")} variant="secondary">
            Apply Pixelate
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CldImage
            width="300"
            height="200"
            src={publicId}
            alt="This is a cool image"
          />

          {filter === "generative-fill" && (
            <CldImage
              width="800"
              height="800"
              src={publicId}
              alt="This is a cool image"
              fillBackground
              crop="pad"
            />
          )}

          {filter === "blur" && (
            <CldImage
              width="800"
              height="800"
              src={publicId}
              alt="This is a cool image"
              blur="800"
            />
          )}

          {filter === "grayscale" && (
            <CldImage
              width="800"
              height="800"
              src={publicId}
              alt="This is a cool image"
              grayscale
            />
          )}

          {filter === "pixelate" && (
            <CldImage
              width="800"
              height="800"
              src={publicId}
              alt="This is a cool image"
              pixelate
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default EditPage;
