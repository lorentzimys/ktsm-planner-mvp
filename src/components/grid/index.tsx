import React, { memo } from "react";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
  IdentifiedColumnDef
} from '@tanstack/react-table'

import {
  CheckboxHeaderCell,
  CheckboxRowCell,
  Filter,
  Total
} from "./components";

import './index.css';

const Grid = ({ data, columnsConfig, useSelection = false }) => {
  const [rowSelection, setRowSelection] = React.useState(
    data.map((_, i) => ({ [i]: true }))
  );
  const columns = [
    useSelection ? {
      id: 'select',
      header: CheckboxHeaderCell,
      cell: CheckboxRowCell,
    } : undefined,
    ...columnsConfig,
  ]

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <div  className="flex flex-col overflow-auto">
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
          <tfoot>
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
          </tfoot>
        </table>
      </div>
      <div className="flex gap-2 py-1 px-2">
        <Total
          selectedLength={Object.keys(rowSelection).length}
          totalLength={table.getPreFilteredRowModel().rows.length}
        />
      </div>
    </div>
  )
}

export default memo(Grid);