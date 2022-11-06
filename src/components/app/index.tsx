import { Routes, Route } from 'react-router-dom'
import {
  PlanningPage,
  WelcomePage,
  ImportNomenclaturePage,
  SelectNomenclaturePage,
  EquipmentPage,
  OpeationsPage
} from '@pages';

import { WizardStep } from '@store/slice';
import WizardLayout from '@components/Wizard';

import './index.css';

const App = () => (
  <Routes>
    <Route index element={<WelcomePage />}></Route>
    
    <Route path="/" element={<WizardLayout />}>
      <Route
        path={`${WizardStep.Import.id}`}
        element={<ImportNomenclaturePage />}
      />
      <Route
        path={`${WizardStep.SelectNomenclature.id}`}
        element={<SelectNomenclaturePage />}
      />
      <Route
        path={`${WizardStep.SelectOperations.id}`}
        element={<OpeationsPage />}
      />
      <Route
        path={`${WizardStep.SelectResources.id}`}
        element={<EquipmentPage />}
      />
      <Route
        path={`/${WizardStep.Plan.id}`}
        element={<PlanningPage />}
      />
    </Route>
  </Routes>
)

export default App;
