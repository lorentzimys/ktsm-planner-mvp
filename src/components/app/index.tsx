import { Routes, Route, Navigate } from 'react-router-dom';
import WizardLayout from '@components/Wizard';

import './index.css';

const App = () => (
  <Routes>
    <Route index element={<WizardLayout />}></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
