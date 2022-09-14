import React, { useState } from 'react';
import { clsx } from 'clsx';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import './index.css';
import DownloadIcon from '../../img/icons/download.svg';

const tasks: any[] = [
  {
    id: 'Task 1',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 12',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 13',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 14',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 15',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 16',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 17',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 18',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },
  {
    id: 'Task 19',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3'
  },

]

const columnHelper = createColumnHelper<any>()

const columns = [
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

function App() {
  const [activeView, setActiveView] = useState<'grid' | 'gantt'>('grid');
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleGridOpen = () => {
    setActiveView('grid');
  }

  const handleGanttOpen = () => {
    setActiveView('gantt');
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div>Загрузите план</div>
        <div className='icon-container'><img src={DownloadIcon}></img></div>
        <div className="button-container">
          <button className="button btn-primary" onClick={handleGridOpen}>Выбор партий</button>
          <button className="button" onClick={handleGanttOpen}>План производства</button>
        </div>
      </header>
      <main className='app-main'>
        <div className={clsx({
          hidden: activeView !== 'grid'
        })}>
           <div className="p-2">
            <table>
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
            <button onClick={() => rerender()} className="border p-2">
              Rerender
            </button>
          </div>
        </div>
        <div className={clsx({
          hidden: activeView !== 'gantt'
        })}>
          <FrappeGantt
              tasks={tasks}
              viewMode={ViewMode.Day}
              onClick={task => console.log(task)}
              onDateChange={(task, start, end) => console.log(task, start, end)}
              onProgressChange={(task, progress) => console.log(task, progress)}
              onTasksChange={tasks => console.log(tasks)}
            />
        </div>
        </main>
    </div>
  );
}

export default App;
