import cloudinary from "cloudinary";
import GalleryGrid from "./GalleryGrid";
import UploadButton from "./UploadButton";
import SearchForm from "@/components/SearchForm";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <SearchForm initialSearch={search} />
      <GalleryGrid images={results.resources} />
    </section>
  );
};

export default GalleryPage;
