import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { RootState } from '@/store';
import { uploadNomenclature, uploadOperations } from '@store/slice';
import { UploadButton } from '@components/Buttons/UploadButton';

import { useAppDispatch } from '@hooks/hooks';
import imgUrl from '../../img/icons/json2.svg';

import styles from './styles.module.css';

const ImportNomenclaturePage = () => {
  const dispatch = useAppDispatch();
  const nomenclatureLoaded = useSelector(
    (state: RootState) => !!state.nomenclature.data
  );
  const nomenclatureFileName = useSelector(
    (state: RootState) => state.nomenclature.fileName
  );
  const operationsLoaded = useSelector(
    (state: RootState) => !!state.operations.data
  );
  const operationsFileName = useSelector(
    (state: RootState) => state.operations.fileName
  );

  const handleUploadNomenclature = useCallback((e) => {
    dispatch(
      uploadNomenclature({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName,
      })
    );
  }, []);

  const handleUploadOperations = useCallback((e) => {
    dispatch(
      uploadOperations({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName,
      })
    );
  }, []);

  return (
    <div className="page-content--center">
      <div className={styles.Container}>
        <div className="flex flex-1 items-center justify-center">
          <img width={92} src={imgUrl} alt="JSON" />
        </div>
        <div className="flex flex-1 items-center justify-center flex-col">
          <span>
            Для того, чтобы приступить к планированию - необходимо загрузить
            первичные данные.
            <br />В качестве первичных данных используется номенклатура
            оборудования, а так же опционально - текущее состояние оборудования.
          </span>
        </div>
        <div className="flex flex-row flex-1 gap-2">
          <UploadButton
            text={
              <div className="flex flex-col">
                {nomenclatureLoaded ? (
                  <div className="flex flex-row align-middle items-center gap-2 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </svg>
                    {nomenclatureFileName}
                  </div>
                ) : (
                  'Загрузить номенклатуру'
                )}
              </div>
            }
            onUpload={handleUploadNomenclature}
            className={clsx(styles.Button, {
              [styles.ButtonLoaded]: nomenclatureLoaded,
            })}
          />
          <UploadButton
            text={
              <div className="flex flex-col">
                {operationsLoaded ? (
                  <div className="flex flex-row align-middle items-center gap-2 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </svg>
                    {operationsFileName}
                  </div>
                ) : (
                  'Загрузить состояние операций'
                )}
              </div>
            }
            onUpload={handleUploadOperations}
            className={clsx(styles.Button, {
              [styles.ButtonLoaded]: operationsLoaded,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ImportNomenclaturePage;
