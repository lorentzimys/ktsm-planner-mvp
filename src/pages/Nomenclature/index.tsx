import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RowSelectionState } from "@tanstack/react-table";


import { RootState } from "../../store";
import { changeNomenclatureSelection } from "@store/slice";
import { nomenclatureColumns } from "../../config/columnsConfig";
import { useAppDispatch } from "../../hooks/hooks";
import Grid from "../../components/Grid";
import ImportNomenclaturePage from "./Import";

const SelectNomenclaturePage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.nomenclature.data);
  const selection = useSelector((state: RootState) => state.nomenclature.selected);
  
  const handleRowSelectionChange = useCallback((rowSelection: RowSelectionState) => {
    dispatch(changeNomenclatureSelection(rowSelection));
  }, []);

  return (
    <div className='flex flex-1 overflow-hidden m-8'>
      <Grid
        data={data}
        columnsConfig={nomenclatureColumns}
        useSelection={{
          selectionState: selection
        }}
        onRowSelectionChange={handleRowSelectionChange}
      />
    </div>
  );
}

export { SelectNomenclaturePage, ImportNomenclaturePage };