import Grid from "../../components/Grid";
import { useSelector } from "react-redux";
import { operationsColumns } from "../../config/columnsConfig";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks/hooks";
import { nextStep } from "../../store/wizard/slice";

const OpeationsPage = () => {
  const data = useSelector((state: RootState) => state.wizard.operations.data);
  const dispatch = useAppDispatch();

  const handleSkipOperations = () => {
    dispatch(nextStep());
  }

  console.log(data);
  return (
    <div className='flex flex-1 overflow-hidden m-8 border shadow-sm'>
      {data ? (
        <Grid data={data} columnsConfig={operationsColumns}/>
      ) : 
      <div className="flex flex-1 flex-col gap-2 justify-center place-content-center content-center items-center">
          <span className="w-96 text-center">Данные о состоянии операций не были импортированы в планировщик, однако, Вы можете пропустить этот шаг</span>
          <button
            onClick={handleSkipOperations}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Пропустить шаг
          </button>
        </div>
      }
    </div>
  );
}

export default OpeationsPage;