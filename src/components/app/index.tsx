import { Routes, Route, Navigate } from 'react-router-dom';
import WizardLayout from '@components/Wizard';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

registerLocale('ru', ru);
setDefaultLocale('ru');

const App = () => (
  <Routes>
    <Route index element={<WizardLayout />}></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
