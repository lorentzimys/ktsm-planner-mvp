import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<any>();

export const nomenclatureColumns = [
  // columnHelper.group({
  //   id: 'nomenclature',
  //   header: 'Номенклатура',
  //   columns: [
  //   ],
  // }),
  columnHelper.accessor('item_id', {
    header: 'Номер',
    size: 50,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('item_desc', {
    cell: info => info.getValue(),
    header: 'Наименование',
  }),
  // columnHelper.group({
  //   id: 'equipment',
  //   columns: [
  //     columnHelper.accessor('equipment', {
  //       header: 'Оборудование',
  //       cell: info => info.getValue(),
  //     }),
  //   ],
  // }),
  columnHelper.accessor('lot', {
    cell: info => info.getValue(),
    header: 'Партия №',
  }),
  columnHelper.accessor('ent', {
    cell: info => info.getValue(),
    header: 'Участок',
  }),
  columnHelper.accessor('qty', {
    cell: info => info.getValue(),
    header: 'Кол-во',
  }),
  columnHelper.accessor('qty_dry', {
    cell: info => info.getValue(),
    header: 'Масса/объем',
  }),
  columnHelper.accessor('uom', {
    cell: info => info.getValue(),
    header: 'Единица измерения',
  }),
  columnHelper.accessor('uom', {
    cell: info => info.getValue(),
    header: 'Единица измерения',
  }),
  columnHelper.accessor('summa_DM', {
    cell: info => info.getValue(),
    header: 'Стоимость партии',
  }),
  columnHelper.accessor('Pt', {
    cell: info => info.getValue(),
    header: '% Pt в партии',
  }),
  columnHelper.accessor('Pt_HCH', {
    cell: info => info.getValue(),
    header: 'Масса Pt в партии',
  }),
  columnHelper.accessor('Pd', {
    cell: info => info.getValue(),
    header: '% Pd в партии',
  }),
  // columnHelper.accessor('weight', {
  //   cell: info => info.getValue(),
  //   header: 'масса/объем',
  // }),
  // columnHelper.accessor('weightNet', {
  //   cell: info => info.getValue(),
  //   header: 'масса сухая',
  // }),
  // columnHelper.accessor('unit', {
  //   cell: info => info.getValue(),
  //   header: 'единица измерения',
  // }),
  // columnHelper.accessor('packageType', {
  //   cell: info => info.getValue(),
  //   header: 'тара',
  // }),
  // columnHelper.accessor('chlorideWeight', {
  //   cell: info => info.getValue(),
  //   header: 'хлорид (%/масса)',
  // }),
  // columnHelper.group({
  //   id: 'containmentDM',
  //   header: 'Содержание ДМ, %г/л',
  //   columns: [
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Pt']), 'value'),
  //       {
  //         header: 'Pt',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Pd']), 'value'),
  //       {
  //         header: 'Pd',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Rh']), 'value'),
  //       {
  //         header: 'Rh',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Ir']), 'value'),
  //       {
  //         header: 'Ir',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Ru']), 'value'),
  //       {
  //         header: 'Ru',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Os']), 'value'),
  //       {
  //         header: 'Os',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Au']), 'value'),
  //       {
  //         header: 'Au',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Ag']), 'value'),
  //       {
  //         header: 'Ag',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //     columnHelper.accessor(
  //       row => get(find(row.containmentDM, ['name', 'Re']), 'value'),
  //       {
  //         header: 'Re',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //   ],
  // }),
  // columnHelper.group({
  //   id: 'containmentNBE',
  //   header: 'Содержание НБЭ',
  //   columns: [
  //     columnHelper.accessor(
  //       row => get(find(row.containmentNBE, ['name', 'Fe']), 'value'),
  //       {
  //         header: 'Fe',
  //         cell: info => info.getValue(),
  //       }
  //     ),
  //   ],
  // }),
  // columnHelper.accessor('value', {
  //   header: 'ценность (руб/кг)',
  //   cell: info => info.getValue(),
  // }
  // )
];

export const operationsColumns = [
  columnHelper.accessor('ent_id', {
    cell: info => info.getValue(),
    header: 'ent_id',
  }),
  columnHelper.accessor('ent_desc', {
    cell: info => info.getValue(),
    header: 'ent_desc',
  }),
  columnHelper.accessor('wo_id', {
    cell: info => info.getValue(),
    header: 'wo_id',
  }),
  columnHelper.accessor('wo_desc', {
    cell: info => info.getValue(),
    header: 'wo_desc',
  }),
  columnHelper.accessor('wo_state', {
    cell: info => info.getValue(),
    header: 'wo_state',
  }),
  columnHelper.accessor('oper_row_id', {
    cell: info => info.getValue(),
    header: 'oper_row_id',
  }),
  columnHelper.accessor('oper_desc', {
    cell: info => info.getValue(),
    header: 'oper_desc',
  }),
  columnHelper.accessor('seq_no', {
    cell: info => info.getValue(),
    header: 'seq_no',
  }),
  columnHelper.accessor('first_job_start_local', {
    cell: info => info.getValue(),
    header: 'first_job_start_local',
  }),
  columnHelper.accessor('job_start_local', {
    cell: info => info.getValue(),
    header: 'job_start_local',
  }),
  columnHelper.accessor('item_id', {
    cell: info => info.getValue(),
    header: 'item_id',
  }),
  columnHelper.accessor('item_desc', {
    cell: info => info.getValue(),
    header: 'item_desc',
  }),
  columnHelper.accessor('lot_no', {
    cell: info => info.getValue(),
    header: 'lot_no',
  }),
  columnHelper.accessor('qty_cons', {
    cell: info => info.getValue(),
    header: 'qty_cons',
  }),
  columnHelper.accessor('abbr_uom', {
    cell: info => info.getValue(),
    header: 'abbr_uom',
  }),
  columnHelper.accessor('oper_seq', {
    cell: info => info.getValue(),
    header: 'oper_seq',
  }),
];

export const resourcesColumns = [
  columnHelper.accessor('isAvailable', {
    cell: info => info.getValue(),
    enableColumnFilter: false,
    header: 'Доступность',
  }),
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: 'Id',
  }),
  columnHelper.accessor('code', {
    cell: info => info.getValue(),
    header: 'Код',
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'Наименованиe',
  }),
  columnHelper.accessor('volume', {
    cell: info => info.getValue(),
    header: 'Объем',
  }),

];