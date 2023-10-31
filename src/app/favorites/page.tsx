import cloudinary from "cloudinary";
import CloudinaryImage from "../gallery/CloudinaryImage";
import UploadButton from "../gallery/UploadButton";
import { SearchResult } from "../gallery/page";
import ForceRefresh from "@/components/ForceRefresh";

const FavoritesPage = async () => {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="flex flex-col gap-8">
      <ForceRefresh />
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Favorites Images</h1>
        <UploadButton />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {results.resources.map((result) => (
          <div key={result.public_id}>
            <CloudinaryImage
              key={result.public_id}
              {...result}
              path="/favorites"
              alt="an image of something"
              width="400"
              height="300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;
