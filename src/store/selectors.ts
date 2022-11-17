import { createSelector } from 'reselect';
import { RootState } from '.';

export const currentStepSelector = (state: RootState) => state.currentStep;

export const stepsSelector = (state: RootState) => state.steps;

export const currentStepItemSelector = createSelector(
  currentStepSelector,
  stepsSelector,
  (currentStep, steps) => steps[currentStep],
);

export const canProceedSelector = (state: RootState) => {
  const currentStep = state.currentStep;
  const nomenclature = state.nomenclature;

  if ([0, 1, 2, 3, 4].includes(currentStep) && nomenclature) {
    return true;
  }

  return false;
};
