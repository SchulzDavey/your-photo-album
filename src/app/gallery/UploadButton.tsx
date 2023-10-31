"use client";

import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { UploadResult } from "../page";

const UploadButton = () => {
  const router = useRouter();

  return (
    <Button asChild>
      <div className="flex gap-2 items-center">
        <CldUploadButton uploadPreset="v0u9n21m" />
      </div>
    </Button>
  );
};

export default UploadButton;
