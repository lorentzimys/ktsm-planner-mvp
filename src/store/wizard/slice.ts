import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRoutes } from '../api';

export type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

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

export interface WizardState {
  steps: Array<WizardStepItem>;
  currentStep: number,
  nomenclature: {
    data: Array<any> | null,
    fileName: string | null
  },
  // nomenclatureFileName: string | null,
  operations: {
    data: Array<any> | null,
    fileName: string | null
  },
  // operationsFileName: string | null,
  equipment: {
    status: FetchStatus,
    items: Array<EquipmentItem> | null
  };
  plan: {
    status: FetchStatus,
    data: any,
  },
}

type UploadAction<T = any[] | null> = {
  data: T;
  fileName: string;
};

export const FETCH_STATUS: Record<string, FetchStatus> = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

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

const initialState: WizardState = {
  steps: Object.values(WizardStep),
  currentStep: 0,
  nomenclature: {
    data: null,
    fileName: null,
  },
  operations:  {
    data: null,
    fileName: null,
  },
  equipment: {
    status: 'idle',
    items: null
  },
  plan: {
    status: 'idle',
    data: null
  },
};

export const fetchEquipment = createAsyncThunk(
  'wizard/equipment',
  async (_, { rejectWithValue }) => {
    const equipment = await (await fetch(apiRoutes.equipment)).json();
    const responseJson: { resources: EquipmentItem[] } = equipment as any;
    return responseJson.resources;
  }
);

export const runPlan = createAsyncThunk(
  'wizars/runPlan',
  async (state, { rejectWithValue }) => {
    const response = (await fetch(apiRoutes.runPlan, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      
      })
    }));

    const responseJson = await response.json();
    console.log(responseJson);
    if (response.ok) {
      return responseJson;
    }
    
    return rejectWithValue(responseJson);
  }
)

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
      state.nomenclature = action.payload;
    },
    uploadOperations: (state, action: PayloadAction<UploadAction>) => {
      state.operations = action.payload;
    },
    clearWizardState: (state) => {
      state.currentStep = 0;
      state.nomenclature = {
        data: null,
        fileName: null,
      };
      state.operations = {
        data: null,
        fileName: null
      };
    },
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
    
    builder.addCase(runPlan.pending, (state) => {
      state.plan.status = FETCH_STATUS.PENDING;
    });
    builder.addCase(runPlan.fulfilled, (state, action) => {
      state.plan.data = action.payload;
      state.plan.status = FETCH_STATUS.FULFILLED;
    });
    builder.addCase(runPlan.rejected, (state) => {
      state.plan.status = FETCH_STATUS.REJECTED;
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
