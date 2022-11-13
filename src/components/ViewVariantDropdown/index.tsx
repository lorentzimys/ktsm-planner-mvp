import { useSelector } from "react-redux";

import { RootState } from '@store';
import { selectViewVariant } from '@store/slice';
import { useAppDispatch } from "@hooks/hooks";

import styles from './styles.module.css';


export const ViewVariants: ViewVariant[] = [
  {
    name: 'Расписание',
    value: 'timeline'
  },
  {
    name: 'Лома и порошки',
    value: 'scrapPowderConversionInfo'
  },
  {
    name: 'Учет Fe',
    value: 'feConversionInfo'
  },
  {
    name: 'Консолидация',
    value: 'consolidationInfo'
  }
]

export const getViewVariant = (value: ViewVariantValue): ViewVariant => {
  return ViewVariants.find(item => item.value === value) as ViewVariant;
};

export const ViewVariantDropdown = () => {
  const dispatch = useAppDispatch();
  const viewVariant = useSelector((state: RootState) => state.plan.viewVariant);
  const handleViewVariantChange = (e) => {
    const type = e.target.getAttribute('data-id');

    dispatch(selectViewVariant(type));
  }


  const buttonPreIcon = (
    <svg className="h-4 w-4 text-blue-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
    </svg>
  )

  const buttonIcon = (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="caret-down"
      className="w-2 ml-2"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
      ></path>
    </svg>
  )

  return (
    <div className="flex justify-center">
      <div className="dropdown relative">
        <button
          className={`${styles.Button} dropdown-toggle gap-1`}
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {buttonPreIcon}
          {getViewVariant(viewVariant).name}
          {buttonIcon}
        </button>
        <ul
          aria-labelledby="dropdownMenuButton1"
          className={`${styles.Dropdown} dropdown-menu`}
        >
          {ViewVariants.map(({value, name}) => (
            <li
              key={value}
              data-id={value}
              onClick={handleViewVariantChange}
              className={`${styles.DropdownItem} dropdown-item`}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}