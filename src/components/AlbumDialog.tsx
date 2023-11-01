import { useState } from "react";
import AddImageToAlbum from "./CreateFolderAction";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { SearchResult } from "../app/gallery/page";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";

const AlbumDialog = ({
  image,
  onClose,
  albumDialog,
}: {
  image: SearchResult;
  onClose: () => void;
  albumDialog: boolean;
}) => {
  const [albumName, setAlbumName] = useState("");

  return (
    <Dialog
      open={albumDialog}
      onOpenChange={(newOpenState) => {
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to album</DialogTitle>
          <DialogDescription>
            Type an album you want to move this image into
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="album-name" className="text-right">
              Album
            </Label>
            <Input
              onChange={(e) => setAlbumName(e.currentTarget.value)}
              id="album-name"
              defaultValue={albumName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              onClose();
              await AddImageToAlbum(image, albumName);
            }}
            type="submit"
          >
            Add to Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
