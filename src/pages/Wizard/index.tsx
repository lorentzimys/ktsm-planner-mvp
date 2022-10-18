import { Outlet } from "react-router-dom";
import { Stepper } from "../../components/Stepper";

export const WizardPage = () => {
  return (
    <>
      <Stepper />
      <Outlet />
    </>
  );
}