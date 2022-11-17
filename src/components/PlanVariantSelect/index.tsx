import { useSelector } from 'react-redux';
import { map } from 'lodash';

import { RootState } from '@/store';
import { selectPlanVariant } from '@store/slice';
import { useAppDispatch } from '@/hooks/hooks';

import styles from './styles.module.css';

export const PlanVariantSelect = () => {
  const dispatch = useAppDispatch();
  const selectedVariant = useSelector(
    (state: RootState) => state.plan.selectedPlan
  );
  const variants = useSelector((state: RootState) => state.plan.data);
  const handleVariantChange = (e) => {
    dispatch(selectPlanVariant(e.target.value));
  };

  return (
    <>
      <span className="text-[11px] text-xs leading-3">Вариант плана</span>
      <select
        defaultValue={selectedVariant as number}
        onChange={handleVariantChange}
        className={`${styles.VariantSelect} form-select form-select-sm`}
        aria-label=".form-select-sm example"
      >
        {map(variants, (variant, i) => (
          <option key={i} value={i}>
            {variant.name}
          </option>
        ))}
      </select>
    </>
  );
};
