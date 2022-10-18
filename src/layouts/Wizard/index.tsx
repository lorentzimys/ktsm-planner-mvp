import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import { Stepper } from "../../components/Stepper";
import { useAppDispatch } from "../../hooks/hooks";

import {
  prevStep,
  nextStep,
  goToStep,
  WizardStep,
  clearWizardState
} from "../../store/wizardSlice";

const WizardLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector(({ wizard }: any) => wizard.currentStep);
  const nomenclatureData = useSelector(({ wizard }: any) => wizard.nomenclatureData);

  const handleExit = () => {
    dispatch(clearWizardState())
    navigate("/", { replace: true });
  }

  const handlePrev = () => {
    dispatch(prevStep());
  }
  
  const handleNext = () => {
    dispatch(nextStep());
  }
  
  useEffect(() => {
    navigate(`/plan/${Object.values(WizardStep)[currentStep]}`);
  }, [currentStep]);

  useEffect(() => {
    if (nomenclatureData !== null) {
      dispatch(goToStep(1));
    }
  }, [nomenclatureData])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Stepper />
      <div className="grow flex">
        <Outlet />
      </div>
      <div className="flex flex-row justify-between p-4">
        <button
          onClick={handleExit}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Выход
        </button>
        <div className="gap-x-2 flex">
          <button
            onClick={handlePrev}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Назад
          </button>
          <button
            onClick={handleNext}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Далее
          </button>
          <button
            // onClick={}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Планирование
          </button>
        </div>
      </div>
    </div>
  )
}

export default WizardLayout;