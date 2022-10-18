import { createSlice } from '@reduxjs/toolkit';

export const WizardStep = {
  ImportNomenclature: 'importNomenclature',
  SelectNomenclature: 'selectNomenclature',
  Resources: 'resources',
  Planning: 'runPlanning',
}

export interface WizardState {
  steps: Array<any>;
  currentStep: number,
}

const initialState: WizardState = {
  steps: Object.values(WizardStep),
  currentStep: 0,
};


export const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, state.steps.length - 1);
    },

  },
});

export const { prevStep, nextStep } = wizardSlice.actions;
