import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter, Outlet } from 'react-router-dom';
import AppLayout from '../../layouts/App';
import WizardLayout from '../../layouts/Wizard';

import { HomePage, PlanningPage, NomenclaturePage } from '../../pages';
import ErrorPage from '../../pages/Error';
import { WelcomePage } from '../../pages/Welcome';

import { AppHeader } from '../AppHeader';
import { StatusBar } from '../StatusBar';
import { STEPS, Stepper } from '../Stepper';

import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />} >
        <Route index element={<WelcomePage />}></Route>
      </Route>
      <Route path="/plan" element={<WizardLayout />}>
        {/* <Route index element={<HomePage />}></Route> */}
        <Route path={`/plan/${STEPS.IMPORT_NOMENCLATURE}`} element={<NomenclaturePage />}></Route>
        <Route path={`/plan/${STEPS.SELECT_NOMENCLATURE}`} element={<NomenclaturePage />}></Route>
        <Route path={`/plan/${STEPS.RESOURCES}`} element={<HomePage />}></Route>
        <Route path={`/plan/${STEPS.RUN_PLANNING}`} element={<PlanningPage />}></Route>
        {/* <Route path="*" element={<ErrorPage />} /> */}
        {/* <Redirect to="/plan/nomenclature" /> */}
      </Route>
    </Routes>
  )
}

export default App;
