import React from 'react';
import { Column, Table } from '@tanstack/react-table';

type FilterProps = {
  column: Column<any, any>;
  table: Table<any>;
};

const numberSearchClassNames = 'w-12 shadow zoom-out';
const textSearchClassNames = 'w-24 shadow zoom-out font-10';

export const Filter = React.memo(({ column, table }: FilterProps) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Мин`}
        className={numberSearchClassNames}
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Макс`}
        className={numberSearchClassNames}
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Поиск...`}
      className={textSearchClassNames}
    />
  );
});
