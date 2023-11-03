import { Asset } from '@prisma/client';
import axios from 'axios';
import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FavoriteSelect = ({
  asset,
  isFavorited,
  setIsFavorited,
}: {
  asset: Asset;
  isFavorited: any;
  setIsFavorited: any;
}) => {
  const router = useRouter();

  const addToFavorites = async (data: any, tag: string) => {
    await axios
      .patch('/api/tag/' + data.id, { tag })
      .then((response) => {
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isFavorited ? (
        <HeartIcon
          onClick={() => {
            setIsFavorited(false);
            addToFavorites(asset, '');
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <HeartIcon
          onClick={() => {
            setIsFavorited(true);
            addToFavorites(asset, 'favorite');
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
    </>
  );
};

export default FavoriteSelect;
