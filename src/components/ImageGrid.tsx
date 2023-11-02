import { Album, Asset } from '@prisma/client';
import { ReactNode } from 'react';

export type ImageGridTypes = {
  assets: Asset[];
  albums?: Album[];
  getImage?: (image: Asset) => ReactNode;
};

const ImageGrid = ({ assets, getImage }: ImageGridTypes) => {
  const MAX_COLUMNS = 4;

  const getColumns = (colIndex: number) => {
    return assets.filter((resource, index) => {
      return index % MAX_COLUMNS === colIndex;
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, index) => (
          <div key={index} className="flex flex-col gap-4">
            {column.map(getImage!)}
          </div>
        )
      )}
    </div>
  );
};

export default ImageGrid;
