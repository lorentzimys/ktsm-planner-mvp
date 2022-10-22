import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { goToStep } from '../../store/wizard/slice';
import {
  canProceedSelector,
  currentStepSelector,
  stepsSelector
} from '../../store/wizard/selectors';

import { WizardStep } from '../../store/wizard/slice'; 
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Stepper = React.memo(() => {
  const dispatch = useAppDispatch();
  const currentStep = useSelector(currentStepSelector);
  const steps = useSelector(stepsSelector);
  const canProceed = useSelector(canProceedSelector);
  const location = useLocation();
  
  const handleSelectStep = index => {
    if (canProceed) {
      dispatch(goToStep(index));
    }
  };

  useEffect(() => {
    const pathname = location.pathname.split('/');
    const stepName = pathname[pathname.length - 1];
    const stepIndex = steps.findIndex(({ id }) => id === stepName);

    if (stepIndex >= 0) {
      dispatch(goToStep(stepIndex));
    }
  }, [location])

  return (
    <nav>
      <ul className="stepper" data-mdb-stepper="stepper">
        {
          Object.values(WizardStep).map((step, i) => {
            const className = clsx("stepper-step", { "stepper-active": currentStep === i });
            return (
              <div key={i} className={className} onClick={() => handleSelectStep(i)}>
                <div className="stepper-head">
                  <span className="stepper-head-icon">{i + 1}</span>
                  <span className="stepper-head-text">
                    <span>{step.value}</span>
                  </span>
                </div>
                {/* <div className="stepper-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </div> */}
              </div>
            )
          })
        }
      </ul>
    </nav>
  )
})
