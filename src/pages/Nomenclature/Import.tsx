import { useCallback } from 'react';
import { UploadButton } from '../../components/UploadButton';
import { useAppDispatch } from '../../hooks/hooks';

import imgUrl from '../../img/icons/json2.svg';
import { uploadNomenclature, uploadOperations } from '../../store/wizard/slice';

const ImportNomenclaturePage = () => {
  const dispatch = useAppDispatch();

  const handleUploadNomenclature = useCallback(e => {
    const data = JSON.parse(e.target?.result as string);
    dispatch(uploadNomenclature(data));
  }, []);

  const handleUploadOperations = useCallback(e => {
    const data = JSON.parse(e.target?.result as string);
    dispatch(uploadOperations(data));
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
          text='Загрузить номенклатуру'
          onUpload={handleUploadNomenclature}
          className="text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        />
        <UploadButton
          text='Загрузить состояние операций'
          onUpload={handleUploadOperations}
          className=" text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        />
      </div>
    </div>
  );
}

export default ImportNomenclaturePage;