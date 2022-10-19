import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { uploadData } from '../../store/dataSlice';
import { UploadButton } from '../UploadButton';


export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const handleUpload = useCallback(e => {
    const data = JSON.parse(e.target?.result as string);
    dispatch(uploadData(data));
  }, []);

  const handlePlan = useCallback(() => {
    console.log('Planning...');
  }, []);

  return (
    <header className='flex flex-col items-start justify-center p-10 gap-10 h-[20vh] bg-slate-500'>
      <h1 className='flex font-semibold text-3xl text-white fo'>Планировщик участка 4.1 Потока МПГ</h1>
      <div className='flex gap-2'>
        <Link className='button' to="/">Выбор партий</Link>
        <Link className='button' to="/planning">План производства</Link>
        <UploadButton text='Импорт JSON' onUpload={handleUpload} />
        <button className='button flex ml-auto' onClick={handlePlan}>Запустить планирование</button>
      </div>
    </header>
  )
}