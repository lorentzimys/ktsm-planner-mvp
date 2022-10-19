import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { goToStep } from '../../store/wizard/slice';
import { currentStep as currStep, currentStepItemSelector } from '../../store/wizard/selectors';

import { WizardStep } from '../../store/wizard/slice'; 

export const Stepper = () => {
  const dispatch = useAppDispatch();
  const currentStep = useSelector(currStep);

  const handleSelectStep = index => {
    dispatch(goToStep(index));
  };

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
}