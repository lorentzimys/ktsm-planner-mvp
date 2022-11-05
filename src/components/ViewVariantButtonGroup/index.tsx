import clsx from "clsx";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "@/store";
import { selectViewVariant, ViewVariant } from '@store/slice';

export const ViewVariantButtonGroup = () => {
  const dispatch = useAppDispatch();
  const viewVariant = useSelector((state: RootState) => state.plan.viewVariant);
  const handleViewVariantChange = (type: ViewVariant) => {
    dispatch(selectViewVariant(type));
  }

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
        <button
          onClick={() => handleViewVariantChange('timeline')}
          type="button"
          className={clsx(
            "rounded-l inline-block px-2 py-1 border border-blue-600 text-xs leading-tight uppercase hover:bg-blue-600 focus:bg-blue-700 hover:text-white focus:text-white focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out",
            {
              'bg-blue-700': viewVariant === 'timeline',
              'text-white': viewVariant === 'timeline'
            }
          )}
        >
          Расписание
        </button>
        <button
          onClick={() => handleViewVariantChange('table')}
          type="button"
          className={clsx(
            "rounded-r inline-block px-2 py-1 border border-blue-600 text-xs leading-tight uppercase hover:bg-blue-600 focus:bg-blue-700 hover:text-white focus:text-white focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out",
            {
              'bg-blue-700': viewVariant === 'table',
              'text-white': viewVariant === 'table'
            }
          )}
        >
          Таблица
        </button>
      </div>
    </div>
  )
}