import React, { memo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  CheckboxHeaderCell,
  CheckboxRowCell,
  Filter,
  Total
} from "./components";

import './index.css';

interface GridProps {
  data: any,
  columnsConfig: ColumnDef<any, any>[],
  useSelection?: boolean |{
    columnId: string
  }
}

const Grid = ({ data, columnsConfig, useSelection = false }: GridProps) => {
  const [rowSelection, setRowSelection] = React.useState(
    data ? data.map((_, i) => ({ [i]: true })) : []
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
          console.error(`Incorrect selectionColumn config. No column with Id ${selCol} found`);
          return columns;
        }

        selCol.header = CheckboxHeaderCell;
        selCol.cell = CheckboxRowCell;
        console.log(selCol, columns);
        return columns;
      } else {
        return [
          {
            id: 'select',
            header: CheckboxHeaderCell,
            cell: CheckboxRowCell,
          },
          ...columns
        ]
      }
      
    }
    return columns;
  };

  const table = useReactTable({
    data: data || [],
    columns: createColumns(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return data ?
    <div className="flex flex-1 flex-col overflow-hidden">
      <div  className="flex flex-1 flex-col overflow-auto">
        <table className="table table--striped">
          <thead className="table__header">
            {table.getHeaderGroups().map((headerGroup, i) => (
              <tr className="table__header-row" key={i}>
                {headerGroup.headers.map((header, i) => (
                  <th
                    {
                    ...{
                        key: i,
                        className: "table__header-cell",
                        colSpan: header.colSpan,
                        style: {
                          width: header.column.getSize(),
                        }
                      }
                    }
                  >
                    {
                      header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())
                    }
                    {
                      header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table__body">
            {table.getRowModel().rows.map((row, i) => (
              <tr  className="table__body-row" key={i}>
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    {
                      ...{
                        className: "table__body-cell",
                        key: i,
                        style: {
                          width: cell.column.getSize(),
                        }
                      }
                    }
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
    :
    <div className="flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden">
      Данные отсутствуют
    </div>
}

export default memo(Grid);