import { Link } from "react-router-dom";

import { WizardStep } from "../../store/wizardSlice";

const WelcomePage = () => (
  <div className="flex flex-1 flex-col justify-center place-content-center content-center items-center">
    <div className="flex flex-col max-w-sm gap-y-4">
      <span>
        Добро пожаловать в планировщик ресурсов!<br />
        Чтобы продолжить "Начать планирование"
      </span>
      <Link to={`/plan/${WizardStep.ImportNomenclature}`}>
        <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Начать планирование
        </button>
      </Link>
    </div>
  </div>
);

export default WelcomePage;