type FetchStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

type ViewVariantValue = 'timeline' | 'scrapPowderConversionInfo' | 'feConversionInfo' | 'consolidationInfo';

interface ViewVariant {
  name: string;
  value: ViewVariantValue;
}

type StepType = 'importData' | 'nomenclature' | 'operations' | 'resources' | 'plan';

interface StepItem {
  id: StepType;
  value: string;
}

interface EquipmentItem {
  id: string;
  code: string;
  name: string;
  volume: number;
  isAvailable: boolean;
}

type UploadAction<T = any[]> = {
  data: T;
  fileName: string;
};
