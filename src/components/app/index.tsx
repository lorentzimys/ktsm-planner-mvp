import React, { Routes, Route } from 'react-router-dom';
import AppLayout from '../../layouts/App';
import WizardLayout from '../../layouts/Wizard';

import {
  HomePage,
  PlanningPage,
  WelcomePage,
  ImportNomenclaturePage,
  SelectNomenclaturePage
} from '../../pages';

import { WizardStep } from '../../store/wizardSlice';

import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />} >
        <Route index element={<WelcomePage />}></Route>
      </Route>
      <Route path="/plan" element={<WizardLayout />}>
        {/* <Route index element={<HomePage />}></Route> */}
        <Route path={`/plan/${WizardStep.ImportNomenclature}`} element={<ImportNomenclaturePage />}></Route>
        <Route path={`/plan/${WizardStep.SelectNomenclature}`} element={<SelectNomenclaturePage />}></Route>
        <Route path={`/plan/${WizardStep.Resources}`} element={<HomePage />}></Route>
        <Route path={`/plan/${WizardStep.Planning}`} element={<PlanningPage />}></Route>
        {/* <Route path="*" element={<ErrorPage />} /> */}
        {/* <Redirect to="/plan/nomenclature" /> */}
      </Route>
    </Routes>
  )
}

export default App;
