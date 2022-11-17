import React, { memo, useEffect } from 'react';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';

import {
  CheckboxHeaderCell,
  CheckboxRowCell,
  Filter,
  Total,
} from './components';

import './index.css';

interface GridProps {
  data: any;
  columnsConfig: ColumnDef<any, any>[];
  useSelection?:
    | boolean
    | {
        columnId?: string | null;
        selectionState: RowSelectionState;
      };
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
}

const Grid = ({
  data,
  columnsConfig,
  useSelection = false,
  onRowSelectionChange,
}: GridProps) => {
  const [rowSelection, setRowSelection] = React.useState(
    useSelection && typeof useSelection === 'object'
      ? useSelection.selectionState
      : {}
  );

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const emptyData = (
    <div className="flex-col page-content--center overflow-hidden">
      Данные отсутствуют
    </div>
  );

  const createColumns = () => {
    let columns = [...columnsConfig];

    if (useSelection) {
      if (typeof useSelection === 'object') {
        const selColId = useSelection.columnId;
        const selCol = columnsConfig.find((col: any) => {
          return col.accessorKey ? col.accessorKey === selColId : false;
        });

        if (!selCol) {
          return [
            {
              id: 'select',
              header: CheckboxHeaderCell,
              cell: CheckboxRowCell,
            },
            ...columns,
          ];
        }

        selCol.header = CheckboxHeaderCell;
        selCol.cell = CheckboxRowCell;
        return columns;
      } else {
        return [
          {
            id: 'select',
            header: CheckboxHeaderCell,
            cell: CheckboxRowCell,
          },
          ...columns,
        ];
      }
    }
    return columns;
  };

  const table = useReactTable({
    data: data || [],
    columns: createColumns(),
    state: {
      rowSelection,
      expanded,
    },
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(rowSelection);
    }
  }, [rowSelection]);

  return data ? (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col overflow-auto">
        <table className="table table--striped">
          <thead className="table__header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="table__header-row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    {...{
                      key: header.id,
                      className: 'table__header-cell',
                      colSpan: header.colSpan,
                      style: {
                        width: header.column.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanFilter() && (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table__body">
            {table.getRowModel().rows.map((row) => (
              <tr className="table__body-row" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    {...{
                      className: 'table__body-cell',
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          {/* <tfoot>
            {table.getFooterGroups().map((footerGroup, i) => (
              <tr key={i}>
                {footerGroup.headers.map((header, i) => (
                  <th key={i}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
        {data.length === 0 && emptyData}
      </div>
      {useSelection && (
        <div className="flex gap-2 py-1 px-2">
          <Total
            selectedLength={Object.keys(rowSelection).length}
            totalLength={table.getPreFilteredRowModel().rows.length}
          />
        </div>
      )}
    </div>
  ) : (
    emptyData
  );
};

export default memo(Grid);
