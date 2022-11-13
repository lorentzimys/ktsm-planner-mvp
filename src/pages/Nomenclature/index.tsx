import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RowSelectionState } from "@tanstack/react-table";

import { RootState } from "@/store";
import { changeNomenclatureSelection, nextStep, uploadNomenclature } from "@store/slice";
import Grid from "@components/Grid";
import { UploadButton } from "@components/Buttons/UploadButton";

import { nomenclatureColumns } from "../../config/columnsConfig";
import { useAppDispatch } from "@hooks/hooks";

import ImportNomenclaturePage from "./Import";

import styles from './styles.module.css';

const SelectNomenclaturePage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.nomenclature.data);
  const nomenclatureLoaded = useSelector((state: RootState) => !!state.nomenclature.data);
  const selection = useSelector((state: RootState) => state.nomenclature.selected);

  const handleUploadNomenclature = useCallback(e => {
    dispatch(
      uploadNomenclature({
        data: JSON.parse(e.target?.result as string),
        fileName: (e.target as any)?.fileName
      })
    );
  }, []);

  const handleSkipOperations = () => {
    dispatch(nextStep());
  }

  const handleRowSelectionChange = useCallback((rowSelection: RowSelectionState) => {
    dispatch(changeNomenclatureSelection(rowSelection));
  }, []);

  const emptyBlock = (
    <div className="flex-col gap-2 page-content--center">
      <span className="w-96 text-center">Данные о номенклатуре не были импортированы</span><br/>
      <div className="flex flex-row gap-2">
        <UploadButton
          text={<div className='flex flex-col'>Загрузить номенклатуру</div>}
          onUpload={handleUploadNomenclature}
          className={styles.Button}
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
    nomenclatureLoaded ?
      <div className='flex flex-1 overflow-hidden m-8'>
        <Grid
          data={data}
          columnsConfig={nomenclatureColumns}
          useSelection={{ selectionState: selection }}
          onRowSelectionChange={handleRowSelectionChange}
        />
      </div> :
      emptyBlock
  );
}

export { SelectNomenclaturePage, ImportNomenclaturePage };