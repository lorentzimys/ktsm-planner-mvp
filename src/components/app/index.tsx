import React, { useState } from 'react';
import { clsx } from 'clsx';
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import { AppHeader } from '../AppHeader';
import addDays from 'date-fns/addDays'

import Grid from '../Grid';

// import DownloadIcon from '../../img/icons/download.svg';
import { useSelector } from 'react-redux';
import { IDataState } from '../../store/dataSlice';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import { HomeScreen, PlanningScreen } from '../../screens/';


import './index.css';
import { StatusBar } from '../StatusBar';

function App() {
  const [activeView, setActiveView] = useState<'grid' | 'gantt'>('grid');
  const data = useSelector(({ data }: { data: IDataState }) => data.value);

  const mapDataToTasks = () => (
    data.map(d => ({
      id: d.id,
      name: d.nomenclature.name,
      start: new Date(),
      end: addDays(new Date(), 10),
      progress: 0,
    // custom_class?: string;
    // setDependencies(value: string[]): void;
    // dependencies: string;
    }))
  )
  
 
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
    <BrowserRouter>
      <div className="app-container">
        <AppHeader
            handleGridOpen={handleGridOpen}
            handleGanttOpen={handleGanttOpen}
        />
        <main className='flex flex-col flex-1 w-[100%]'>
          <div className='flex flex-col'>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/planning" element={<PlanningScreen />} />
            </Routes>
          </div>
          {/* <div className={clsx(['flex', 'flex-col'],{
            hidden: activeView !== 'grid'
          })}>
            <Grid />
          </div>
          <div className={clsx({
            hidden: activeView !== 'gantt'
          })}>
            {data && data.length && (
              <FrappeGantt
                tasks={mapDataToTasks()}
                viewMode={ViewMode.Day}
                onClick={task => console.log(task)}
                onDateChange={(task, start, end) => console.log(task, start, end)}
                onProgressChange={(task, progress) => console.log(task, progress)}
                onTasksChange={tasks => console.log(tasks)}
              />
            )}
          </div> */}
        </main>
        <StatusBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
