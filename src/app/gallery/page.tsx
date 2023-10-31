import cloudinary from "cloudinary";
import CloudinaryImage from "./CloudinaryImage";
import UploadButton from "./UploadButton";
import ForceRefresh from "@/components/ForceRefresh";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async () => {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="flex flex-col gap-8">
      <ForceRefresh />
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {results.resources.map((result) => (
          <div key={result.public_id}>
            <CloudinaryImage
              key={result.public_id}
              imagedata={result}
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

export default GalleryPage;
