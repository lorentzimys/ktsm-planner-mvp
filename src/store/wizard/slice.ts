import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowSelectionState } from '@tanstack/react-table';
import { at } from 'lodash';
import { RootState } from '..';
import { apiRoutes } from '../api';

import schedulerData from '../../mocks/data.json';
import { TimelineGroup, TimelineItem } from 'vis';
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
    fileName: string | null,
    selected: RowSelectionState,
  },
  // nomenclatureFileName: string | null,
  operations: {
    data: Array<any> | null,
    fileName: string | null
  },
  // operationsFileName: string | null,
  equipment: {
    status: FetchStatus,
    data: Array<EquipmentItem> | null,
    selected: RowSelectionState,
  };
  plan: {
    status: FetchStatus,
    data: {
      groups: TimelineGroup[],
      items: TimelineItem[] 
    },
  },
}

type UploadAction<T = any[]> = {
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
    selected: {},
  },
  operations:  {
    data: null,
    fileName: null,
  },
  equipment: {
    status: 'idle',
    data: null,
    selected: {},
  },
  plan: {
    status: 'idle',
    data: {
      groups: [],
      items: []
    }
  },
};

export const fetchEquipment = createAsyncThunk(
  'wizard/equipment',
  async (_, { rejectWithValue }) => {
    const response = await fetch(apiRoutes.equipment);
    const responseJson = await response.json();

    if (response.ok) {
      return responseJson.resources;
    }

    return rejectWithValue(responseJson);
  }
);

export const runPlan = createAsyncThunk(
  'wizard/runPlan',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    console.log(at, state.wizard.nomenclature.data);
    const meterials = at(
      state.wizard.nomenclature.data || [],
      Object.keys(state.wizard.nomenclature.selected) as any
    );

    const resources = at(
      state.wizard.equipment.data || [],
      Object.keys(state.wizard.equipment.selected) as any
    );
    return schedulerData[0].Schedule as any;
    console.log(meterials, state.wizard.nomenclature.data, Object.keys(state.wizard.nomenclature.selected));
    const response = (await fetch(apiRoutes.runPlan, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Materials: meterials,
        Resources: resources
      })
    }));

    const responseJson = await response.json();
    
    if (response.ok) {
      return schedulerData[0].Schedule;
      //return responseJson;
    }
    return schedulerData;
    //return rejectWithValue(responseJson);
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
      state.nomenclature = {
        ...action.payload,
        selected: action.payload.data.reduce((acc, curr, i) => {
          acc[i] = true;
          return acc;
        }, {})
      }
    },
    uploadOperations: (state, action: PayloadAction<UploadAction>) => {
      state.operations = action.payload;
    },
    changeNomenclatureSelection: (state, action: PayloadAction<RowSelectionState>) => {
      state.nomenclature.selected = action.payload;
    },
    changeEquipmentSelection: (state, action: PayloadAction<RowSelectionState>) => {
      state.equipment.selected = action.payload;
    },
    clearWizardState: (state) => {
      state.currentStep = 0;
      state.nomenclature = {
        data: null,
        fileName: null,
        selected: {},
      };
      state.operations = {
        data: null,
        fileName: null,
      };
      state.equipment = {
        status: 'idle',
        data: null,
        selected: {},
      };
      state.plan = {
        status: 'idle',
        data: {
          groups: [],
          items: []
        },
      };
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchEquipment.pending, (state) => {
      state.equipment.status = FETCH_STATUS.PENDING;
    });
    builder.addCase(fetchEquipment.fulfilled, (state, action) => {
      state.equipment.data = action.payload;
      state.equipment.selected = action.payload.reduce((acc, curr, i) => {
        acc[i] = true;
        return acc;
      }, {});
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
  changeNomenclatureSelection,
  changeEquipmentSelection,
} = wizardSlice.actions;
