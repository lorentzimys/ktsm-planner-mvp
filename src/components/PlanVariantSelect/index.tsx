import { times } from "lodash";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "../../store";
import { selectPlanVariant } from "../../store/wizard/slice";

export const PlanVariantSelect = () => {
  const dispatch = useAppDispatch();
  const selectedVariant = useSelector((state: RootState) => state.wizard.plan.selectedPlan);
  const totalVatiants = useSelector((state: RootState) => state.wizard.plan.data.length);
  const handleVariantChange = (e) => {
    dispatch(selectPlanVariant(+e.target.value));
  }

  return (
    <div className="flex flex-row gap-2">
      <label>Вариант плана</label>
      <select
        onChange={handleVariantChange}
        className="form-select form-select-sm
        appearance-none
        block
        px-2
        py-1
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-12"
        aria-label=".form-select-sm example">
        {
          times(totalVatiants, i => (
            <option
              key={i}
              value={i + 1}
              selected={selectedVariant === i}
            >
              {i + 1}
            </option>
          ))
        }
        </select>
    </div>
  );
}