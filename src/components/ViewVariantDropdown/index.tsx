import { useSelector } from 'react-redux';

import { RootState } from '@store';
import { selectViewVariant } from '@store/slice';
import { useAppDispatch } from '@hooks/hooks';

import styles from './styles.module.css';
import { TableIcon } from '@components/Icons/Table';
import { CalendarIcon } from '@components/Icons/Calendar';
import { CaretDownIcon } from '@components/Icons/CaretDown';

export const ViewVariants: ViewVariant[] = [
  {
    name: 'Расписание (план)',
    value: 'timeline',
    type: 'timeline',
  },
  {
    name: 'Расписание (табл.)',
    value: 'timelineTable',
    type: 'table',
  },
  {
    name: 'Лома и порошки',
    value: 'scrapPowderConversionInfo',
    type: 'table',
  },
  {
    name: 'Учет Fe',
    value: 'feConversionInfo',
    type: 'table',
  },
  {
    name: 'Консолидация',
    value: 'consolidationInfo',
    type: 'table',
  },
];

export const getViewVariant = (value: ViewVariantValue): ViewVariant => {
  return ViewVariants.find((item) => item.value === value) as ViewVariant;
};

export const ViewVariantDropdown = () => {
  const dispatch = useAppDispatch();
  const viewVariantName = useSelector(
    (state: RootState) => state.plan.viewVariant
  );
  const handleViewVariantChange = (e) => {
    const type = e.target.getAttribute('data-id');

    dispatch(selectViewVariant(type));
  };

  const currentViewVariant = getViewVariant(viewVariantName);

  const viewVariantContent = (viewVariantName) => {
    const viewVariant = getViewVariant(viewVariantName);
    return (
      <>
        {viewVariant.type === 'table' && <TableIcon />}
        {viewVariant.type === 'timeline' && <CalendarIcon />}
        {viewVariant.name}
      </>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="dropdown relative">
        <button
          className={`${styles.Button} dropdown-toggle gap-1`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {viewVariantContent(currentViewVariant.value)}
          {<CaretDownIcon className="w-2 ml-2" />}
        </button>
        <ul
          aria-labelledby="dropdownMenuButton1"
          className={`${styles.Dropdown} dropdown-menu`}
        >
          {ViewVariants.map(({ value }) => (
            <li
              key={value}
              data-id={value}
              onClick={handleViewVariantChange}
              className={`${styles.DropdownItem} dropdown-item flex-row flex`}
            >
              {viewVariantContent(value)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
