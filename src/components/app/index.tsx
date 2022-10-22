import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AppLayout from '../../layouts/App';
import WizardLayout from '../../layouts/Wizard';

import {
  PlanningPage,
  WelcomePage,
  ImportNomenclaturePage,
  SelectNomenclaturePage
} from '../../pages';
import OpeationsPage from '../../pages/Operations';
import { EquipmentPage } from '../../pages/Equipment';

import { WizardStep } from '../../store/wizard/slice';

import './index.css';

const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />} >
      <Route index element={<WelcomePage />}></Route>
    </Route>
    
    <Route path="/plan" element={<WizardLayout />}>
      {/* <Route index element={<HomePage />}></Route> */}
      <Route
        path={`/plan/${WizardStep.Import.id}`}
        element={<ImportNomenclaturePage />}
      />
      <Route
        path={`/plan/${WizardStep.SelectNomenclature.id}`}
        element={<SelectNomenclaturePage />}
      />
      <Route
        path={`/plan/${WizardStep.SelectOperations.id}`}
        element={<OpeationsPage />}
      />
      <Route
        path={`/plan/${WizardStep.SelectResources.id}`}
        element={<EquipmentPage />}
      />
      <Route
        path={`/plan/${WizardStep.Plan.id}`}
        element={<PlanningPage />}
      />
      {/* <Route path="*" element={<ErrorPage />} /> */}
      {/* <Redirect to="/plan/nomenclature" /> */}
    </Route>
  </Routes>
)

export default App;
