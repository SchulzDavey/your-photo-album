"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

const EditPage = ({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) => {
  const [prompt, setPrompt] = useState("");
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [filter, setFilter] = useState<
    undefined | "generative-fill" | "blur" | "grayscale" | "pixelate"
  >();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>
        <div className="flex flex-row gap-4">
          <Button onClick={() => setFilter(undefined)} variant="secondary">
            Clear All
          </Button>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                setPrompt(pendingPrompt);
                setFilter("generative-fill");
              }}
              variant="secondary"
            >
              Apply Generative Fill
            </Button>
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              placeholder="Prompt..."
              id="prompt"
              value={pendingPrompt}
              onChange={(e) => setPendingPrompt(e.currentTarget.value)}
            />
          </div>
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
            width="800"
            height="800"
            src={publicId}
            alt="This is a cool image"
          />

          {filter === "generative-fill" && (
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
