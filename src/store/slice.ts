import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowSelectionState } from '@tanstack/react-table';
import { at } from 'lodash';
import { RootState } from './index';
import { apiRoutes } from '@utils/api';

import { TimelineGroup, TimelineItem } from 'vis';
export type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type WizardStepType = 'importData' | 'nomenclature' | 'operations' | 'resources' | 'plan';

export type ViewVariant = 'timeline' | 'scrapPowderConversionInfo' | 'feConversionInfo' | 'consolidationInfo'; 
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
  operations: {
    data: Array<any> | null,
    fileName: string | null
  },
  equipment: {
    status: FetchStatus,
    data: Array<EquipmentItem> | null,
    selected: RowSelectionState,
  };
  plan: {
    viewVariant: ViewVariant;
    selectedPlan: number | null,
    showLegend: boolean,
    status: FetchStatus,
    data: {
      totalTime: string | null,
      groups: TimelineGroup[],
      items: TimelineItem[],
      legendItems: TimelineGroup[],
      table: any;
    }[],
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
    value: 'Просмотр операций'
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
    viewVariant: 'timeline',
    selectedPlan: null,
    showLegend: false,
    status: 'idle',
    data: [],
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
    const meterials = at(
      state.nomenclature.data || [],
      Object.keys(state.nomenclature.selected) as any
    );

    const resources = at(
      state.equipment.data || [],
      Object.keys(state.equipment.selected) as any
    );

    
    const response = (await fetch(apiRoutes.runPlan, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Materials: meterials,
        Resources: resources,
        
      })
    }));

    const responseJson = await response.json();
    
    if (response.ok) {
      return responseJson.map(({ groups, items, legendItems, table, cost }) => ({
        groups,
        items,
        legendItems: legendItems,
        table: table || [],
        totalTime: cost.totalTime
      }));
    }
    return rejectWithValue(responseJson);
  }
)

export const appSlice = createSlice({
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
      state.plan = { ...initialState.plan as any };
    },
    toggleLegend: (state, action) => {
      state.plan.showLegend = action.payload;
    },
    selectPlanVariant: (state, action) => {
      state.plan.selectedPlan = action.payload;
    },
    selectViewVariant: (state, action) => {
      state.plan.viewVariant = action.payload;
    }
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
      state.plan.selectedPlan = 0;
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
  toggleLegend,
  selectPlanVariant,
  selectViewVariant
} = appSlice.actions;
