import { Asset } from '@prisma/client';
import { ReactNode } from 'react';

const ImageGrid = ({
  images,
  getImage,
}: {
  images: Asset[];
  getImage: (image: Asset) => ReactNode;
}) => {
  const MAX_COLUMNS = 4;

  const getColumns = (colIndex: number) => {
    return images.filter((resource, index) => {
      return index % MAX_COLUMNS === colIndex;
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, index) => (
          <div key={index} className="flex flex-col gap-4">
            {column.map(getImage)}
          </div>
        )
      )}
    </div>
  );
};

export default ImageGrid;
