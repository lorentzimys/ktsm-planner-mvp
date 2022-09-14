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
  createColumnHelper
} from '@tanstack/react-table'

import './index.css';

const columnHelper = createColumnHelper<any>()

const columns = [
  columnHelper.accessor('selected', {
    cell: info => <input type="checkbox"
      onChange={info.row.getToggleSelectedHandler()}
      checked={info.row.getIsSelected()}
    />,
  }),
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    // footer: info => info.column.id,
  }),
  // columnHelper.accessor(row => row.lastName, {
  //   id: 'lastName',
  //   cell: info => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   footer: info => info.column.id,
  // }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => info.renderValue(),
    // footer: info => info.column.id,
  }),
  columnHelper.accessor('start', {
    header: () => 'Start',
    cell: info => info.getValue(),
    // footer: info => info.column.id,
  }),
  columnHelper.accessor('end', {
    header: 'End',
    cell: info => info.getValue(),
    // footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Progress',
    cell: info => info.getValue(),
    // footer: info => info.column.id,
  }),
]

const Grid = (props: { data: any; }) => {
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('')
  
  const table = useReactTable({
    data: props.data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  
  const handleRerender = React.useCallback(() => { 
    console.log(table, table.getAllColumns());
  }, [table]);


  console.log(table);

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
      <button onClick={handleRerender} className="border p-2">
        Rerender
      </button>
    </div>
  )
}

export default Grid;