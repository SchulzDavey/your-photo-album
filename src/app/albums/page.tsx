import cloudinary from "cloudinary";
import AlbumCard from "./AlbumCard";

export type Folder = { name: string; params: string };

const AlbumsPage = async () => {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 justify-between">
        <h1 className="text-4xl font-bold">Albums</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {folders.map((folder) => (
          <AlbumCard key={folder.params} folder={folder} />
        ))}
      </div>
    </section>
  );
};

export default AlbumsPage;
