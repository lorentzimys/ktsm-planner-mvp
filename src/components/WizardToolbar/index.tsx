import clsx from "clsx";
import { stat } from "fs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "../../store";
import { currentStep as currStep } from "../../store/wizard/selectors";

import {
  prevStep,
  nextStep,
  clearWizardState,
  goToStep
} from "../../store/wizard/slice";

const WizardToolbar = () => {
  const dispatch = useAppDispatch();
  const planningAllowed = useSelector((state: RootState) => state.wizard.nomenclature);
  const currentStep = useSelector(currStep);
  const prevText = useSelector((state: RootState) => {
    const currentStep = state.wizard.currentStep;
    if (currentStep < 2) {
      return 'Заново';
    } else {
      return 'Назад'
    }
  });

  const canProceed = useSelector((state: RootState) => {
    const currentStep = state.wizard.currentStep;
    const nomenclature = state.wizard.nomenclature;

    if ([0, 1, 2, 3].includes(currentStep) && nomenclature) {
      return true;
    }

    return false;
  })

  const handleExit = () => {
    // eslint-disable-next-line no-restricted-globals
    const procced = confirm('Текущая сессия планирования будет утеряна. Все равно продолжить?');
    if (procced) {
      dispatch(clearWizardState())
      dispatch(goToStep(0));
      // navigate("/", { replace: true });
    }
  }

  const handlePrev = () => {
    if (currentStep < 2) {
      handleExit();
    } else {
      dispatch(prevStep());
    }
  }
  
  const handleNext = () => {
    dispatch(nextStep());
  }

  const handlePlan = () => {
    console.log('handlePlan');
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
          Запустить планирование
        </button>
      </div>
    </div>
  )
}

export default WizardToolbar;