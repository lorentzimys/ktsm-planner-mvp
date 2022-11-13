import { Link } from "react-router-dom";

import { WizardStep } from "@store/slice";

export const WelcomePage = () => (
  <div className="flex-col page-content--center">
    <div className="flex flex-col max-w-sm gap-y-4">
      <span>
        Добро пожаловать в планировщик ресурсов!<br />
        Чтобы продолжить "Начать планирование"
      </span>
      <Link to={`${WizardStep.Import.id}`}>
        <button className="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Начать планирование
        </button>
      </Link>
    </div>
  </div>
);
