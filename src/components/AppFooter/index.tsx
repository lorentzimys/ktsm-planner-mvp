import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { uploadData } from './../../store/dataSlice';

export const AppFooter = ({ handleImport, handleRefresh, handlePlan }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const onFileChanged = useCallback(e => {
    setFile(e.target.files[0]);
  }, []);

  const handleFileUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  useEffect(() => {
    if (file) {
      const filereader = new FileReader();
      filereader.onload = e => {
        const data = JSON.parse(e.target?.result as string);
        dispatch(uploadData(data));
      };
      filereader.readAsText(file as Blob);
    }
  }, [file]);

  const UploadButton = React.memo(() => (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="json"
        style={{ display: 'none' }}
        onChange={onFileChanged}
      />
      <button className='button' onClick={handleFileUpload}>Импорт .json</button>
    </>
  ));

  return (
    <footer className='flex flex-col items-start justify-center p-10 bg-slate-500'>
      <div className='flex flex-row flex-1 gap-2 w-[100%]'>
        <UploadButton />
        {/* <button className='button' onClick={handleRefresh}>Обновить партии</button> */}
        <button className='button flex ml-auto' onClick={handlePlan}>Запустить планирование</button>
      </div>
    </footer>
  )
}