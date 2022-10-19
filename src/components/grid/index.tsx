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

// import { useSelector } from 'react-redux';
// import { IDataState } from '../../store/dataSlice';

// import { columnsConfig } from "./columnsConfig";

import './index.css';

const Grid = ({ data, columnsConfig }) => {
  const [rowSelection, setRowSelection] = React.useState({});
  // const [globalFilter, setGlobalFilter] = React.useState('');
  // const data = useSelector(({ wizard }: any) => wizard.nomenclature);

  const table = useReactTable({
    data: data || [],
    columns: columnsConfig,
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