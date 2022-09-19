import { createColumnHelper } from '@tanstack/react-table'
import { find, get } from 'lodash';

const columnHelper = createColumnHelper<any>();

export const columnsConfig = [
  columnHelper.group({
    id: 'nomenclature',
    header: 'Номенклатура',
    columns: [
      columnHelper.accessor('id', {
        header: 'Id',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        header: 'Наименование',
      }),
    ],
  }),
  columnHelper.group({
    id: 'equipment',
    columns: [
      columnHelper.accessor('equipment', {
        header: 'Оборудование',
        cell: info => info.getValue(),
      }),
    ],
  }),
  columnHelper.accessor('batchNo', {
    cell: info => info.getValue(),
    header: 'Партия №',
  }),
  columnHelper.accessor('probeNo', {
    cell: info => info.getValue(),
    header: '№ пробы',
  }),
  columnHelper.accessor('weight', {
    cell: info => info.getValue(),
    header: 'масса/объем',
  }),
  columnHelper.accessor('weightNet', {
    cell: info => info.getValue(),
    header: 'масса сухая',
  }),
  columnHelper.accessor('unit', {
    cell: info => info.getValue(),
    header: 'единица измерения',
  }),
  columnHelper.accessor('packageType', {
    cell: info => info.getValue(),
    header: 'тара',
  }),
  columnHelper.accessor('chlorideWeight', {
    cell: info => info.getValue(),
    header: 'хлорид (%/масса)',
  }),
  columnHelper.group({
    id: 'containmentDM',
    header: 'Содержание ДМ, %г/л',
    columns: [
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Pt']), 'value'),
        {
          header: 'Pt',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Pd']), 'value'),
        {
          header: 'Pd',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Rh']), 'value'),
        {
          header: 'Rh',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Ir']), 'value'),
        {
          header: 'Ir',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Ru']), 'value'),
        {
          header: 'Ru',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Os']), 'value'),
        {
          header: 'Os',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Au']), 'value'),
        {
          header: 'Au',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Ag']), 'value'),
        {
          header: 'Ag',
          cell: info => info.getValue(),
        }
      ),
      columnHelper.accessor(
        row => get(find(row.containmentDM, ['name', 'Re']), 'value'),
        {
          header: 'Re',
          cell: info => info.getValue(),
        }
      ),
    ],
  }),
  columnHelper.group({
    id: 'containmentNBE',
    header: 'Содержание НБЭ',
    columns: [
      columnHelper.accessor(
        row => get(find(row.containmentNBE, ['name', 'Fe']), 'value'),
        {
          header: 'Fe',
          cell: info => info.getValue(),
        }
      ),
    ],
  }),
  columnHelper.accessor('value', {
    header: 'ценность (руб/кг)',
    cell: info => info.getValue(),
  }
  )
];