import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hooks/hooks';
import { RootState } from '@/store';
import { canProceedSelector, currentStepSelector as currStep } from '@store/selectors';

import { prevStep, nextStep, clearWizardState, goToStep, runPlan, refreshOntology } from '@store/slice';

import { RefreshOntologyButton } from '@components/Buttons/RefreshOntologyButton';
import { RefreshIcon } from '@components/Icons/Refresh';
import { StartIcon } from '@components/Icons/Start';
import clsx from 'clsx';

const Toolbar = () => {
  const dispatch = useAppDispatch();
  const currentStep = useSelector(currStep);
  const ontologyLoaded = useSelector((state: RootState) => {
    return state.ontology.status === 'fulfilled';
  });
  const planningStatus = useSelector((state: RootState) => state.plan.status);
  const planningAllowed = useSelector((state: RootState) => {
    return Boolean(
      (state.nomenclature?.data?.length ?? false) && state.ontology.status !== 'pending' && planningStatus !== 'pending'
    );
  });
  const prevText = useSelector((state: RootState) => {
    const currentStep = state.currentStep;
    if (currentStep < 1) {
      return 'Заново';
    } else {
      return 'Назад';
    }
  });

  const classNames = clsx('w-4 h-4', {
    'animate-spin': planningStatus === 'pending',
  });

  const canProceed = useSelector(canProceedSelector);

  const handleExit = () => {
    // eslint-disable-next-line no-restricted-globals
    const procced = confirm('Текущая сессия планирования будет утеряна. Все равно продолжить?');
    if (procced) {
      dispatch(clearWizardState());
      dispatch(goToStep(0));
    }
  };

  const handlePrev = () => {
    if (currentStep < 1) {
      handleExit();
    } else {
      dispatch(prevStep());
    }
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handlePlan = async () => {
    if (!ontologyLoaded) {
      await dispatch(refreshOntology());
    }
    dispatch(runPlan());
    dispatch(goToStep(4));
  };

  return (
    <div className="flex flex-row justify-between px-4 py-2">
      <div className="gap-x-4 flex">
        <div className="gap-x-1 flex">
          <button onClick={handlePrev} className="button button__primary button--small">
            {prevText}
          </button>
          <button
            disabled={!canProceed}
            onClick={handleNext}
            className="disabled:opacity-50 disabled:cursor-not-allowed button button__primary button--small"
          >
            Далее
          </button>
        </div>
        <RefreshOntologyButton />
      </div>
      <div className="gap-x-2 flex">
        <button
          onClick={handlePlan}
          disabled={!planningAllowed}
          className="disabled:opacity-50 gap-2 text-xs disabled:cursor-not-allowed button button__primary button--small"
        >
          {planningStatus === 'idle' ? <StartIcon /> : <RefreshIcon className={classNames} />}
          Построить план
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
