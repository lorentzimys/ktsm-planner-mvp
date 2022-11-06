import { times } from "lodash";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "@/store";
import { selectPlanVariant } from "@store/slice";
import styles from "./styles.module.css";

export const PlanVariantSelect = () => {
  const dispatch = useAppDispatch();
  const selectedVariant = useSelector((state: RootState) => state.plan.selectedPlan);
  const totalVatiants = useSelector((state: RootState) => state.plan.data.length);
  const handleVariantChange = (e) => {
    dispatch(selectPlanVariant(e.target.value-1));
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <label className='text-xs'>Вариант плана</label>
      <select
        defaultValue={selectedVariant as number}
        onChange={handleVariantChange}
        className={`${styles.VariantSelect} form-select form-select-sm`}
        aria-label=".form-select-sm example"
      >
        {
          times(totalVatiants, i => (
            <option
              key={i}
              value={i + 1}
            >
              {i + 1}
            </option>
          ))
        }
      </select>
    </div>
  );
}