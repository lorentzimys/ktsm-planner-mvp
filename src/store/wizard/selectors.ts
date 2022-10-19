import { createSelector } from "reselect";

export const currentStep = (state) => state.wizard.currentStep;

export const steps = (state) => state.wizard.steps;

export const currentStepItemSelector = createSelector(
  currentStep,
  steps,
  (currentStep, steps) => steps[currentStep]
)