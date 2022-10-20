import React, { Routes, Route, useLocation } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group';
import AppLayout from '../../layouts/App';
import WizardLayout from '../../layouts/Wizard';

import {
  HomePage,
  PlanningPage,
  WelcomePage,
  ImportNomenclaturePage,
  SelectNomenclaturePage
} from '../../pages';
import OpeationsPage from '../../pages/Operations';

import { WizardStep } from '../../store/wizard/slice';

import './index.css';

function App() {
  const location = useLocation();
  
  return (
    <Routes location={location}>
      <Route path="/" element={<AppLayout />} >
        <Route index element={<WelcomePage />}></Route>
      </Route>
      
      <Route path="/plan" element={<WizardLayout />}>
        {/* <Route index element={<HomePage />}></Route> */}
        <Route path={`/plan/${WizardStep.Import.id}`} element={<ImportNomenclaturePage />}></Route>
        <Route path={`/plan/${WizardStep.SelectNomenclature.id}`} element={<SelectNomenclaturePage />}></Route>
        <Route path={`/plan/${WizardStep.SelectOperations.id}`} element={<OpeationsPage />}></Route>
        <Route path={`/plan/${WizardStep.SelectResources.id}`} element={<HomePage />}></Route>
        <Route path={`/plan/${WizardStep.Plan.id}`} element={<PlanningPage />}></Route>
        {/* <Route path="*" element={<ErrorPage />} /> */}
        {/* <Redirect to="/plan/nomenclature" /> */}
      </Route>
    </Routes>
  )
}

export default App;
