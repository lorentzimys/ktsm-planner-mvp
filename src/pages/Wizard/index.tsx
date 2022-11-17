import { Outlet } from 'react-router-dom';
import { Stepper } from '../../components/Stepper';

export const WizardPage = () => (
  <>
    <Stepper />
    <Outlet />
  </>
);
