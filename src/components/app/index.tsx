import React, { useState } from 'react';
import { clsx } from 'clsx';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';

import Grid from '../grid';

import DownloadIcon from '../../img/icons/download.svg';
import './index.css';

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
          <Grid data={tasks} />
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
