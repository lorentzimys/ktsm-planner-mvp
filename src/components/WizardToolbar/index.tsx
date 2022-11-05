import { useSelector } from "react-redux";

import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "@/store";
import { canProceedSelector, currentStepSelector as currStep } from "@store/selectors";

import {
  prevStep,
  nextStep,
  clearWizardState,
  goToStep,
  runPlan
} from "@store/slice";

const WizardToolbar = () => {
  const dispatch = useAppDispatch();
  const planningAllowed = useSelector((state: RootState) => state.nomenclature);
  const planningStatus = useSelector((state: RootState) => state.plan.status);
  const currentStep = useSelector(currStep);
  const prevText = useSelector((state: RootState) => {
    const currentStep = state.currentStep;
    if (currentStep < 1) {
      return 'Заново';
    } else {
      return 'Назад'
    }
  });

  const canProceed = useSelector(canProceedSelector);

  const handleExit = () => {
    // eslint-disable-next-line no-restricted-globals
    const procced = confirm('Текущая сессия планирования будет утеряна. Все равно продолжить?');
    if (procced) {
      dispatch(clearWizardState())
      dispatch(goToStep(0));
    }
  }

  const handlePrev = () => {
    if (currentStep < 1) {
      handleExit();
    } else {
      dispatch(prevStep());
    }
  }
  
  const handleNext = () => {
    dispatch(nextStep());
  }

  const handlePlan = () => {
    dispatch(runPlan());
    dispatch(goToStep(4));
  }
  
  return (
    <div className="flex flex-row justify-between p-2">
      <div className="gap-x-2 flex">
        <button
          onClick={handlePrev}
          className="inline-block px-2 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          {prevText}
        </button>
        <button
          disabled={!canProceed}
          onClick={handleNext}
          className="disabled:opacity-50 disabled:cursor-not-allowed inline-block px-2 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Далее
        </button>
      </div>
      <div className="gap-x-2 flex">
        <button
          onClick={handlePlan}
          disabled={!planningAllowed}
          className="disabled:opacity-50 text-xs disabled:cursor-not-allowed flex flex-row items-center gap-2 px-2 py-2 bg-blue-600 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          {
            planningStatus === 'idle' ?
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                Запустить планирование
              </> :
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Перезапустить планирование
              </>
          }
        </button>
      </div>
    </div>
  )
}

export default WizardToolbar;