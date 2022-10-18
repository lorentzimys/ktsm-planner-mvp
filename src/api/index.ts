export interface NomenclatureItem {
  id: string;
  nomenclature: {
    index: number,
    name: string
  },
  equipment: number,
  batchNo: 5846,
  probeNo: number,
  weight: number,
  weightNet: number,
  unit: string,
  packageType: string,
  chlorideWeight: number,
  containmentDM: Array<{
    name: string,
    value: number
  }>,
  containmentNBE: Array<{
    name: string,
    value: number
  }>,
  value: string
}

export type ApiContract = {
  importNomenclature: (data: JSON) => Promise<NomenclatureItem[]>;
}

const configuredApi: any = {};

export function configureApi(api: ApiContract): ApiContract {
  if (Object.keys(configuredApi).length === 0) {
    Object.assign(configureApi, api);
    Object.freeze(configuredApi);
  } else {
    console.error("Api has been already configured!");
  }

  return configuredApi;
}

export function getApi(): ApiContract {
  if (Object.keys(configuredApi).length === 0) { 
    console.error("Api is not yet configured!");
  }

  return configureApi as any as ApiContract;
}