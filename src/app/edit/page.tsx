import prisma from '@/prisma/client';
import Editor from './Editor';

const EditPage = async ({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) => {
  const asset = await prisma.asset.findUnique({
    where: {
      id: publicId,
    },
  });

  return (
    <section className="pt-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Edit {publicId}</h1>
      </div>
      <Editor asset={asset} publicId={publicId} />
    </section>
  );
};

export default EditPage;
