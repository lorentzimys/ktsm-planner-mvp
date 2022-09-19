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

  return (
    <BrowserRouter>
      <div className="app-container">
        <AppHeader />
        <main className='flex flex-col flex-1 w-[100%]'>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/planning" element={<PlanningScreen />} />
          </Routes>
        </main>
        <StatusBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
