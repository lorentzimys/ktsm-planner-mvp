import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRoutes } from '../api';

export type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export const FETCH_STATUS: Record<string, FetchStatus> = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};
export type WizardStepType = 'importData' | 'nomenclature' | 'operations' | 'resources' | 'plan';
interface WizardStepItem {
  id: WizardStepType;
  value: string;
}

interface EquipmentItem {
  id: string;
  code: string;
  name: string;
  volume: number;
  isAvailable: boolean;
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
  operationsFileName: string | null,
  equipment: {
    status: FetchStatus,
    items: Array<EquipmentItem> | null
  };
  planningAllowed: boolean,
}

const initialState: WizardState = {
  steps: Object.values(WizardStep),
  currentStep: 0,
  nomenclature: null,
  nomenclatureFileName: null,
  operations: null,
  operationsFileName: null,
  equipment: {
    status: 'idle',
    items: null
  },
  planningAllowed: false
};

interface UploadAction {
  data: any;
  fileName: string;
}

export const fetchEquipment = createAsyncThunk(
  'wizard/equipment',
  async (_, { rejectWithValue }) => {
    const equipment = await (await fetch(apiRoutes.equipment)).json();
    const responseJson: { resources: EquipmentItem[] } = equipment as any;
    return responseJson.resources;
  }
);

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
    uploadNomenclature: (state, action: PayloadAction<UploadAction>) => {
      state.nomenclature = action.payload.data;
      state.nomenclatureFileName = action.payload.fileName;
    },
    uploadOperations: (state, action: PayloadAction<UploadAction>) => {
      state.operations = action.payload.data;
      state.operationsFileName = action.payload.fileName;
    },

    clearWizardState: (state) => {
      state.currentStep = 0;
      state.nomenclature = null;
      state.operations = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEquipment.pending, (state) => {
      state.equipment.status = FETCH_STATUS.PENDING;
    });
    builder.addCase(fetchEquipment.fulfilled, (state, action) => {
      state.equipment.items = action.payload;
      state.equipment.status = FETCH_STATUS.FULFILLED;
    });
    builder.addCase(fetchEquipment.rejected, (state) => {
      state.equipment.status = FETCH_STATUS.REJECTED;
    });
  }
});

export const {
  prevStep,
  nextStep,
  goToStep,
  clearWizardState,
  uploadNomenclature,
  uploadOperations,
} = wizardSlice.actions;
