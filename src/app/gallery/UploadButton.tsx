"use client";

import { Button } from "@/src/components/ui/button";
import { CldUploadButton } from "next-cloudinary";

const UploadButton = () => {
  return (
    <Button asChild>
      <div className="flex gap-2 items-center">
        <CldUploadButton uploadPreset="v0u9n21m" />
      </div>
    </Button>
  );
};

export default UploadButton;
