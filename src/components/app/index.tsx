import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomeScreen, PlanningScreen } from '../../screens';

import { AppHeader } from '../AppHeader';
import { StatusBar } from '../StatusBar';

import './index.css';

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
