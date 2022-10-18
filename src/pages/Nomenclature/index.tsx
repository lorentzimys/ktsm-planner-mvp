import { useCallback } from 'react';
import { UploadButton } from '../../components/UploadButton';
import { useAppDispatch } from '../../hooks/hooks';

import imgUrl from '../../img/icons/json2.svg';
import { uploadData } from '../../store/dataSlice';

const NomenclaturePage = () => {
  const dispatch = useAppDispatch();

  const handleUpload = useCallback(e => {
    const data = JSON.parse(e.target?.result as string);
    dispatch(uploadData(data));
  }, []);

  return (
    <div className='flex flex-1 place-content-center self-center'>
      <div className='flex flex-col align-middle gap-2 p-10 border-dashed border-slate-700 border-2 ratio-16x9'>
        <div className='flex flex-1 items-center w-60 justify-center'>
          <img width={92} src={imgUrl} alt="JSON"/>
        </div>
        <div className='flex flex-1 items-center w-60 justify-center flex-col'>
          <span>
            Перетащите .json файл <br />в область для загрузки
          </span>
          <small>или</small>
        </div>
        <UploadButton
          onUpload={handleUpload}
          className=" text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        />
      </div>
    </div>
  );
}

export default NomenclaturePage;