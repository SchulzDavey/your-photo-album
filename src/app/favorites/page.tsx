import cloudinary from 'cloudinary';
import UploadButton from '../gallery/UploadButton';
import FavoritesList from './FavoritesList';
import { Asset } from '@prisma/client';

const FavoritesPage = async () => {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image AND tags=favorite')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: Asset[] };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Favorites Images</h1>
        <UploadButton />
      </div>
      <FavoritesList initialResources={results.resources} />
    </section>
  );
};

export default FavoritesPage;
