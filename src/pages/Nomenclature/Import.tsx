import clsx from 'clsx';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { UploadButton } from '@components/UploadButton';
import { useAppDispatch } from '../../hooks/hooks';

import imgUrl from '../../img/icons/json2.svg';
import { RootState } from '../../store';
import { uploadNomenclature, uploadOperations } from '@store/slice';

const ImportNomenclaturePage = () => {
  const dispatch = useAppDispatch();
  const nomenclatureLoaded = useSelector((state: RootState) => !!state.nomenclature.data);
  const nomenclatureFileName = useSelector((state: RootState) => state.nomenclature.fileName);
  const operationsLoaded = useSelector((state: RootState) => !!state.operations.data);
  const operationsFileName = useSelector((state: RootState) => state.operations.fileName);

  const getUploadButtonCls = (loaded: boolean) => (
    clsx('text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out', {
      'bg-green-600 hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 ': loaded
    })
  );

  const handleUploadNomenclature = useCallback(e => {
    console.log(e);
    dispatch(
      uploadNomenclature({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName
      })
    );
  }, []);

  const handleUploadOperations = useCallback(e => {
    dispatch(
      uploadOperations({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName
      })
    );
  }, []);

  return (
    <div className='flex flex-1 place-content-center self-center'>
      <div className='flex flex-col align-middle gap-2 p-10 border-dashed border-slate-700 border-2 w-1/2'>
        <div className='flex flex-1 items-center justify-center'>
          <img width={92} src={imgUrl} alt="JSON"/>
        </div>
        <div className='flex flex-1 items-center justify-center flex-col'>
          <span>
            Для того, чтобы приступить к планированию - необходимо загрузить первичные данные.<br />
            В качестве первичных данных используется номенклатура оборудования, а так же опционально - текущее состояние оборудования.
          </span>
          <small>или</small>
        </div>
      
        <UploadButton
          text={
            <div className='flex flex-col'>
              {
                nomenclatureLoaded ? (
                  <div className='flex flex-row align-middle items-center gap-2 justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>
                    { nomenclatureFileName }
                  </div>
                ) : 'Загрузить номенклатуру'
              }
              
            </div>
          }
          onUpload={handleUploadNomenclature}
          className={getUploadButtonCls(nomenclatureLoaded)}
        />
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
      </div>
    </div>
  );
}

export default ImportNomenclaturePage;