import React, {memo} from "react";
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

import { CheckboxHeaderCell, CheckboxRowCell } from "./components/Checkbox";

import './index.css';

const Grid = ({ data, columnsConfig, useSelection = false }) => {
  const [rowSelection, setRowSelection] = React.useState({});
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
  });

  return (
    <div className="flex flex-col overflow-auto">
      <table className="table table--striped">
        <thead className="table__header">
          {table.getHeaderGroups().map(headerGroup => (
            <tr className="table__header-row" key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th className="table__header-cell"  key={header.id} colSpan={header.colSpan }>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table__body">
          {table.getRowModel().rows.map(row => (
            <tr  className="table__body-row" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td className="table__body-cell"  key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
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
      <div className="flex gap-2 ">
        <span className="">Выбрано</span>
        <span className="font-semibold">
          {Object.keys(rowSelection).length} из{' '}
          {table.getPreFilteredRowModel().rows.length} 
        </span>
      </div>
    </div>
  )
}

export default memo(Grid);