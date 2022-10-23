import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { nextStep, uploadOperations } from "../../store/wizard/slice";
import { operationsColumns } from "../../config/columnsConfig";
import { useAppDispatch } from "../../hooks/hooks";
import Grid from "../../components/Grid";
import { UploadButton } from "../../components/UploadButton";
import { useCallback } from "react";
import clsx from "clsx";

const OpeationsPage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.wizard.operations.data);
  const operationsLoaded = useSelector((state: RootState) => !!state.wizard.operations.data);
  const operationsFileName = useSelector((state: RootState) => state.wizard.operations.fileName);
  const handleUploadOperations = useCallback(e => {
    dispatch(
      uploadOperations({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName
      })
    );
  }, []);
  const getUploadButtonCls = (loaded: boolean) => (
    clsx('text-center inline-block px-3 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out', {
      'bg-green-600 hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 ': loaded
    })
  );

  const handleSkipOperations = () => {
    dispatch(nextStep());
  }

  return (
    <div className='flex flex-1 overflow-hidden m-8'>
      {data ? (
        <Grid data={data} columnsConfig={operationsColumns}/>
      ) : 
      <div className="flex flex-1 flex-col gap-2 justify-center place-content-center content-center items-center">
          <span className="w-96 text-center">Данные о состоянии операций не были импортированы в планировщик, однако, Вы можете пропустить этот шаг</span>
          <UploadButton
            text={
              <div className='flex flex-col'>
                {
                  operationsLoaded ? (
                    <div className='flex flex-row align-middle items-center gap-2 justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                      </svg>
                      { operationsFileName }
                    </div>
                  ) : 'Загрузить состояние операций'
                }
                
              </div>
            }
            onUpload={handleUploadOperations}
            className={getUploadButtonCls(operationsLoaded)}
          />
          <span className="text-xs">или</span>
          <button
            onClick={handleSkipOperations}
            className="inline-block px-3 py-2 border text-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-200 hover:shadow-lg focus:shadow-lg focus:ring-0 transition duration-150 ease-in-out">
            Пропустить шаг
          </button>

        </div>
      }
    </div>
  );
}

export default OpeationsPage;