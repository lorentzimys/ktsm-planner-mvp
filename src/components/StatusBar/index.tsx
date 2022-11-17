import { useCallback, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import clsx from 'clsx';

import importFile from '../../mocks/import.json';

import './index.css';

export const StatusBar = () => {
  const [statusBarOpen, setStatusBarOpen] = useState<boolean>(true);

  const handleToggleStatusBar = useCallback(() => {
    console.log(statusBarOpen);
    setStatusBarOpen(!statusBarOpen);
  }, [statusBarOpen]);

  return (
    <div
      className={clsx('status-bar', {
        'status-bar--active': statusBarOpen,
      })}
    >
      <div className="status-bar__header">
        <small className="status-bar__heading">Строка состояния</small>
        <span
          className={clsx('status-bar__toggle-button', {
            'status-bar__toggle-button--active': statusBarOpen,
          })}
          onClick={handleToggleStatusBar}
        >
          ‹
        </span>
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
    </div>
  );
};
