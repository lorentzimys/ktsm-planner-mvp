import { get, find } from 'lodash'
import { RootState } from '@/store';
import { selectViewVariant, ViewVariant, ViewVariantValue } from '@/store/slice';
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";

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
          className={`${styles.Button} dropdown-toggle `}
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
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