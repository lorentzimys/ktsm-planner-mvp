import { createSelector } from "reselect";
import { RootState } from "..";

export const currentStepSelector = (state: RootState) => state.wizard.currentStep;

export const stepsSelector = (state: RootState) => state.wizard.steps;

export const currentStepItemSelector = createSelector(
  currentStepSelector,
  stepsSelector,
  (currentStep, steps) => steps[currentStep]
)

export const canProceedSelector = (state: RootState) => {
  const currentStep = state.wizard.currentStep;
  const nomenclature = state.wizard.nomenclature;

  if ([0, 1, 2].includes(currentStep) && nomenclature) {
    return true;
  }

  return false;
}