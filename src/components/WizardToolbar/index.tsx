import React from "react";
import { Root } from "react-dom/client";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "../../store";
import { canProceedSelector, currentStepSelector as currStep } from "../../store/wizard/selectors";

import {
  prevStep,
  nextStep,
  clearWizardState,
  goToStep,
  runPlan
} from "../../store/wizard/slice";

const WizardToolbar = () => {
  const dispatch = useAppDispatch();
  const planningAllowed = useSelector((state: RootState) => state.wizard.nomenclature);
  const planningStatus = useSelector((state: RootState) => state.wizard.plan.status);
  const currentStep = useSelector(currStep);
  const prevText = useSelector((state: RootState) => {
    const currentStep = state.wizard.currentStep;
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
    <div className="flex flex-row justify-between p-4">
      <div className="gap-x-2 flex">
        <button
          onClick={handlePrev}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          {prevText}
        </button>
        <button
          disabled={!canProceed}
          onClick={handleNext}
          className="disabled:opacity-50 disabled:cursor-not-allowed inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Далее
        </button>
      </div>
      <div className="gap-x-2 flex">
        <button
          onClick={handlePlan}
          disabled={!planningAllowed}
          className="disabled:opacity-50 disabled:cursor-not-allowed  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          {
            planningStatus === 'idle' ?
              'Запустить планирование' :
              'Перезапустить планирование'
          }
        </button>
      </div>
    </div>
  )
}

export default WizardToolbar;