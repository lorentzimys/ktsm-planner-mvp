import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import { useAppDispatch } from "../../hooks/hooks";

import {
  prevStep,
  nextStep,
  clearWizardState
} from "../../store/wizard/slice";

const WizardToolbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleExit = () => {
    dispatch(clearWizardState())
    navigate("/", { replace: true });
  }

  const handlePrev = () => {
    dispatch(prevStep());
  }
  
  const handleNext = () => {
    dispatch(nextStep());
  }
  
  return (
    <div className="flex flex-row justify-between p-4">
      <button
        onClick={handleExit}
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Выход
      </button>
      <div className="gap-x-2 flex">
        <button
          onClick={handlePrev}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Назад
        </button>
        <button
          onClick={handleNext}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Далее
        </button>
        <button
          // onClick={}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Планирование
        </button>
      </div>
    </div>
  )
}

export default WizardToolbar;