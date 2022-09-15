import React from "react";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
  createColumnHelper,
  IdentifiedColumnDef
} from '@tanstack/react-table'
import { useSelector } from 'react-redux';
import { IDataState } from '../../store/dataSlice';

import './index.css';

const columnHelper = createColumnHelper<any>();

const Grid = () => {
  const [rowSelection, setRowSelection] = React.useState({});
  // const [globalFilter, setGlobalFilter] = React.useState('');
  const data = useSelector(({ data }: { data: IDataState }) => data.value);

  const getColumns = () => (
    Object.entries(data && data.length ? data[0] : {}).map(([colName, colValue]) => (
      columnHelper.accessor(colName, {
        header: colName,
        cell: info => typeof info.getValue() !== 'object' ? info.getValue() : "",
      })
    ))
  )

  console.log(getColumns());

  const table = useReactTable({
    data: data || [],
    columns: getColumns(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  
  // const handleRerender = React.useCallback(() => { 
  //   console.log(table, table.getAllColumns());
  // }, [table]);

  return (
    <div className="flex flex-col">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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
      <div className="h-4" />
      <div>
        {Object.keys(rowSelection).length} of{' '}
        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
      </div>
    </div>
  )
}

export default Grid;