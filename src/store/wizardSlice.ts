import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const WizardStep = {
  ImportNomenclature: 'importNomenclature',
  SelectNomenclature: 'selectNomenclature',
  Resources: 'resources',
  Planning: 'runPlanning',
}

export interface WizardState {
  steps: Array<any>;
  currentStep: number,
  nomenclatureData: any,
}

const initialState: WizardState = {
  steps: Object.values(WizardStep),
  currentStep: 0,
  nomenclatureData: null,
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
    goToStep: (state, action: PayloadAction<any>) => { 
      if (action.payload > state.steps.length - 1 || action.payload < 0) {
        console.error(`Step ${action.payload} cannot be processed`);
        return;
      }
      state.currentStep = action.payload;
    },
    uploadNomenclatureData: (state, action: PayloadAction<any>) => {
      state.nomenclatureData = action.payload;
    },
    clearWizardState: (state) => {
      state.currentStep = 0;
      state.nomenclatureData = null;
    }
  },
});

export const {
  prevStep,
  nextStep,
  goToStep,
  clearWizardState,
  uploadNomenclatureData
} = wizardSlice.actions;
