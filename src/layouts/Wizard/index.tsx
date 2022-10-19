import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group";

import { Stepper } from "../../components/Stepper";
import WizardToolbar from "../../components/WizardToolbar";
import { useAppDispatch } from "../../hooks/hooks";

import { goToStep, WizardStep } from "../../store/wizard/slice";

const WizardLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = useSelector(({ wizard }: any) => wizard.currentStep);
  const nomenclature = useSelector(({ wizard }: any) => wizard.nomenclature);
  
  useEffect(() => {
    navigate(`/plan/${Object.values(WizardStep)[currentStep].id}`);
  }, [currentStep]);

  // useEffect(() => {
  //   if (nomenclature !== null) {
  //     dispatch(goToStep(1));
  //   }
  // }, [nomenclature])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shadow-sm shadow-gray-400 z-900">
        <Stepper />
      </div>
      <div className="flex flex-1 overflow-auto">
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Outlet />
        </CSSTransition>
      </div>
      <div className="shadow-md shadow-gray-600 z-900">
        <WizardToolbar />
      </div>
    </div>
  )
}

export default WizardLayout;