import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WizardStepType = 'importData' | 'nomenclature' | 'operations' | 'resources' | 'plan';
interface WizardStepItem {
  id: WizardStepType,
  value: string,
}

export const WizardStep: Record<string, WizardStepItem> = {
  Import: {
    id: 'importData',
    value: 'Импорт данных'
  },
  SelectNomenclature: {
    id: 'nomenclature',
    value: 'Выбор номенклатуры'
  },
  SelectOperations: {
    id: 'operations',
    value: 'Выбор операций'
  },
  SelectResources: {
    id: 'resources',
    value: 'Выбор ресурсов'
  },
  Plan: {
    id: 'plan',
    value: 'Планирование'
  }
}

export interface WizardState {
  steps: Array<WizardStepItem>;
  currentStep: number,
  nomenclature: Array<any> | null,
  nomenclatureFileName: string | null,
  operations: Array<any> | null,
  planningAllowed: boolean,
}

const initialState: WizardState = {
  steps: Object.values(WizardStep),
  currentStep: 0,
  nomenclature: null,
  nomenclatureFileName: null,
  operations: null,
  planningAllowed: false
};

interface UploadNomenclature {
  data: any;
  fileName: string;
}

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
    uploadNomenclature: (state, action: PayloadAction<UploadNomenclature>) => {
      state.nomenclature = action.payload.data;
      state.nomenclatureFileName = action.payload.fileName;
    },
    uploadOperations: (state, action: PayloadAction<any>) => {
      state.operations = action.payload;
    },
    clearWizardState: (state) => {
      state.currentStep = 0;
      state.nomenclature = null;
      state.operations = null;
    }
  },
});

export const {
  prevStep,
  nextStep,
  goToStep,
  clearWizardState,
  uploadNomenclature,
  uploadOperations
} = wizardSlice.actions;
