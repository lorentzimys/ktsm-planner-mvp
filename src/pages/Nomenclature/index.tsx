import ImportNomenclaturePage from "./Import";
import Grid from "../../components/Grid";
import { useSelector } from "react-redux";
import { nomenclatureColumns } from "../../config/columnsConfig";
import { RootState } from "../../store";
import { useCallback } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { useAppDispatch } from "../../hooks/hooks";
import { changeNomenclatureSelection } from "../../store/wizard/slice";

const SelectNomenclaturePage = () => {
  const data = useSelector((state: RootState) => state.wizard.nomenclature.data);
  const selection = useSelector((state: RootState) => state.wizard.nomenclature.selected);
  const dispatch = useAppDispatch();
  const handleRowSelectionChange = useCallback((rowSelection: RowSelectionState) => {
    dispatch(changeNomenclatureSelection(rowSelection));
  }, []);

  return (
    <div className='flex flex-1 overflow-hidden m-8 border shadow-sm'>
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