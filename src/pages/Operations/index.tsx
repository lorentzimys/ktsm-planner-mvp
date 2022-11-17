import { useCallback } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { nextStep, uploadOperations } from "@store/slice";
import { UploadButton } from "@components/Buttons/UploadButton";
import Grid from "@components/Grid";

import { operationsColumns } from "@config/columnsConfig";
import { useAppDispatch } from "@hooks/hooks";

import styles from './styles.module.css';

const OpeationsPage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.operations.data);
  const handleUploadOperations = useCallback(e => {
    dispatch(
      uploadOperations({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName
      })
    );
  }, []);

  const handleSkipOperations = () => {
    dispatch(nextStep());
  }

  const emptyBlock = (
    <div className="flex-col gap-2 page-content--center">
      <span className="w-96 text-center">Данные о состоянии операций не были импортированы</span>
      <div className="flex flex-row gap-2">
        <UploadButton
          onUpload={handleUploadOperations}
          className={styles.Button}
          text={<div className='flex flex-col'>Загрузить состояние операций</div>}
        />
        <button
          onClick={handleSkipOperations}
          className={styles.SkipButton}>
          Пропустить шаг
        </button>
      </div>
    </div>
  );

  return (
    <div className='flex flex-1 overflow-hidden m-4'>
      {
        data ?
          <Grid data={data} columnsConfig={operationsColumns} /> :
          emptyBlock
      }
    </div>
  );
}

export default OpeationsPage;