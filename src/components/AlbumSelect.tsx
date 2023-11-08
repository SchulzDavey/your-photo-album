import { Album, Asset } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const AlbumSelect = ({
  asset,
  albums,
  onClose,
}: {
  asset: Asset;
  albums: Album[];
  onClose: () => void;
}) => {
  const router = useRouter();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();

  const moveAssetToAlbum = async (asset: any, albumId: string) => {
    await axios
      .patch('/api/album/' + asset.id, {
        albumId,
      })
      .then((response) => {
        router.refresh();
        // onClose();
        toast.success('Album moved successfully!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error has occurred. Try again.');
      });
  };

  const filterAlbums = async () => {
    albums.filter((album) => {
      if (album.id === asset.albumId) {
        return setSelectedAlbum(album);
      }
    });
  };

  useEffect(() => {
    filterAlbums();
  }, []);

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <Label htmlFor="album-name" className="text-right">
        Move to Album
      </Label>
      <Select
        onValueChange={(value) => {
          moveAssetToAlbum(asset, value);
        }}
        value={selectedAlbum?.id}
        defaultValue={selectedAlbum?.id}
      >
        <SelectTrigger id="album">
          <SelectValue placeholder="Select Album" />
        </SelectTrigger>
        <SelectContent position="popper">
          {albums.map((album) => (
            <SelectItem
              className="cursor-pointer"
              key={album.id}
              value={album.id}
            >
              {album.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlbumSelect;
