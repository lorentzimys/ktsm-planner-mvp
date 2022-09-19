import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from '../../hooks/hooks';
import { uploadData } from './../../store/dataSlice';
import MonacoEditor from 'react-monaco-editor';
import classnames from 'classnames';

import importFile from "../../mocks/import.json";

import './index.scss';

console.log(JSON);

export const StatusBar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const [statusBarOpen, setStatusBarOpen] = useState<boolean>(true);

  const handleToggleStatusBar = useCallback(() => {
    console.log(statusBarOpen)
    setStatusBarOpen(!statusBarOpen);
  }, [statusBarOpen]);

  // const onFileChanged = useCallback(e => {
  //   setFile(e.target.files[0]);
  // }, []);

  // const handleFileUpload = useCallback(() => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // }, [fileInputRef]);

  // useEffect(() => {
  //   if (file) {
  //     const filereader = new FileReader();
  //     filereader.onload = e => {
  //       const data = JSON.parse(e.target?.result as string);
  //       dispatch(uploadData(data));
  //     };
  //     filereader.readAsText(file as Blob);
  //   }
  // }, [file]);

  // const UploadButton = memo(() => (
  //   <>
  //     <input
  //       ref={fileInputRef}
  //       type="file"
  //       accept="json"
  //       style={{ display: 'none' }}
  //       onChange={onFileChanged}
  //     />
  //     <button className='button' onClick={handleFileUpload}>Импорт .json</button>
  //   </>
  // ));

  return (
    <div className={
      classnames("status-bar", {
        "status-bar--active": statusBarOpen
      })
    }>
      <div className="status-bar__header">
        <small className="status-bar__heading">Строка состояния</small>
        <span
          className={
            classnames("status-bar__toggle-button", {
              "status-bar__toggle-button--active": statusBarOpen
            })
          }
          onClick={handleToggleStatusBar}
        >‹</span>
      </div>
      <ul className="status-bar__tab-container">
        <li className="status-bar__tab-item"> Импорт</li>
        <li className="status-bar__tab-item">Планирование</li>
      </ul>
      <div className="status-bar__content">
        <MonacoEditor
          width="100%"
          height="400"
          language="shell"
          theme="vs-dark"
          value={JSON.stringify(importFile)}
        // options={options}
        // onChange={::this.onChange}
        // editorDidMount={::this.editorDidMount}
        />
      </div>
      {/* <UploadButton /> */}
      {/* <button className='button' onClick={handleRefresh}>Обновить партии</button> */}
      {/* <button className='button flex ml-auto' onClick={handlePlan}>Запустить планирование</button> */}
    </div>
  );
}