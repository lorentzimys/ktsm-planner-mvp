import React, { useState } from 'react';
import { clsx } from 'clsx';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import { AppHeader } from '../AppHeader';
import { AppFooter } from '../AppFooter';

import Grid from '../Grid';

// import DownloadIcon from '../../img/icons/download.svg';
import './index.css';
import { useSelector } from 'react-redux';
import { IDataState } from '../../store/dataSlice';

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


function App() {
  const [activeView, setActiveView] = useState<'grid' | 'gantt'>('grid');
  
 
  const handleGridOpen = () => {
    setActiveView('grid');
  }

  const handleGanttOpen = () => {
    setActiveView('gantt');
  }

  const handleImportFile = (e) => {
    console.log(e);
  }

  return (
    <div className="app-container">
      <AppHeader
          handleGridOpen={handleGridOpen}
          handleGanttOpen={handleGanttOpen}
      />
      <main className='flex flex-col flex-1 w-[100%]'>
        <div className={clsx(['flex', 'flex-col'],{
          hidden: activeView !== 'grid'
        })}>
          {/* <Grid data={data || []} /> */}
          <Grid />
        </div>
        <div className={clsx({
          hidden: activeView !== 'gantt'
        })}>
          {/* <FrappeGantt
              tasks={[]}
              viewMode={ViewMode.Day}
              onClick={task => console.log(task)}
              onDateChange={(task, start, end) => console.log(task, start, end)}
              onProgressChange={(task, progress) => console.log(task, progress)}
              onTasksChange={tasks => console.log(tasks)}
            /> */}
        </div>
      </main>
      <AppFooter
        handleImport={ (e) => handleImportFile(e) }
        handleRefresh={() => void(null)}
        handlePlan={() => void(null) }
      />
    </div>
  );
}

export default App;
