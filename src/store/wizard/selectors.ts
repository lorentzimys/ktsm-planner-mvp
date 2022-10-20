import { createSelector } from "reselect";
import { RootState } from "..";

export const currentStep = (state: RootState) => state.wizard.currentStep;

export const steps = (state: RootState) => state.wizard.steps;

export const currentStepItemSelector = createSelector(
  currentStep,
  steps,
  (currentStep, steps) => steps[currentStep]
)

export const canProceedSelector = (state: RootState) => {
  const currentStep = state.wizard.currentStep;
  const nomenclature = state.wizard.nomenclature;

  if ([0, 1, 2, 3].includes(currentStep) && nomenclature) {
    return true;
  }

  return false;
}