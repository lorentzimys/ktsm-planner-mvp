interface PlanningResultGroup {
  id: string;
  content: string;
}

interface PlanningResultLegendItem {
  id: string;
  content: string;
  style: string;
}

interface PlanningResultScheduleItem {
  content: string;
  end: string;
  group: string;
  id: string;
  start: string;
  style: string;
  title: string;
}

interface PlanningResultInfo {
  absorbationCount: number;
  allowedCodes?: string[];
  checkResult?: {
    success: boolean;
    minCount: number;
    maxCount: number;
    parts: [number[], number[]];
  };
  child?: PlanningResultInfo[];
  costPerKg: number;
  fe: number;
  id: string;
  index: number;
  item_id: string;
  orderIndex: number;
  qty_dry: number;
  sample_name: string;
  summa_DM: number;
  type: string; // 'Other' | 'LongBranch'
  variants?: [PlanningResultInfo][];
}

interface PlannigResultTableInfo {
  columns: string[];
  rows: string | number[];
}

interface PlanningResults {
  name: string;
  totalTime: string | null;
  groups: PlanningResultGroup[];
  infos: PlannigResultTableInfo;
  items: PlanningResultScheduleItem[];
  legendItems: PlanningResultLegendItem[];
  feConversionInfo?: PlanningResultInfo[];
  scrapPowderConversionInfo?: PlanningResultInfo[];
  consolidationInfo?: PlanningResultInfo[];
}
