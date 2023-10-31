import UploadButton from "@/app/gallery/UploadButton";
import cloudinary from "cloudinary";
import AlbumGrid from "./AlbumGrid";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async ({
  params: { path },
}: {
  params: { path: string };
}) => {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${path}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Album {path}</h1>
        <UploadButton />
      </div>
      <AlbumGrid images={results.resources} />
    </section>
  );
};

export default GalleryPage;
