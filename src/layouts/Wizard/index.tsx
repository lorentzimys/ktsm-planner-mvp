import { Link, Outlet, useNavigate } from "react-router-dom"
import { Stepper } from "../../components/Stepper";

const WizardLayout = () => {

  const navigate = useNavigate();
  
  const handleExit = () => {
    navigate("/", { replace: true });
  }

  return (
    <div className="flex flex-1 flex-col">
      <Stepper />
      <div className="grow flex">
        <Outlet />
      </div>
      <div className="flex flex-row justify-between p-4">
        <button onClick={handleExit} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Выход
        </button>
        {/* <Link to="/">
        </Link> */}
        <div className="gap-x-2 flex">
          <Link to="/">
            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Назад
            </button>
          </Link>
          <Link to="/">
            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Далее
            </button>
          </Link>
          <button disabled className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Планирование
          </button>
        </div>
      </div>
    </div>
  )
}

export default WizardLayout;