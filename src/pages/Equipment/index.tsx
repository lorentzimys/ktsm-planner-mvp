import React, { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RowSelectionState } from "@tanstack/react-table";

import { resourcesColumns } from "../../config/columnsConfig";

import { RootState } from "../../store"
import { changeEquipmentSelection, fetchEquipment, FETCH_STATUS } from "@store/slice";

import { useAppDispatch } from "../../hooks/hooks";

import Grid from "../../components/Grid";

const wrapperClassNames = "flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden m-8";

export const EquipmentPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const equipment = useSelector((state: RootState) => state.equipment.data);
  const fetchStatus = useSelector((state: RootState) => state.equipment.status);
  const selected = useSelector((state: RootState) => state.equipment.selected);
  const handleRowSelectionChange = useCallback((rowSelection: RowSelectionState) => {
    dispatch(changeEquipmentSelection(rowSelection));
  }, []);

  useEffect(() => {
    if (!equipment) {
      dispatch(fetchEquipment());
    }
  }, [equipment])

  return (
    <div className={wrapperClassNames}>
      {fetchStatus === FETCH_STATUS.PENDING && <>Загрузка данных...</>}
      {fetchStatus === FETCH_STATUS.FULFILLED && equipment !== null && (
        <Grid
          data={equipment}
          useSelection={{
            columnId: 'isAvailable',
            selectionState: selected
          }}
          columnsConfig={resourcesColumns}
          onRowSelectionChange={handleRowSelectionChange}
        />
      )}
      {fetchStatus === FETCH_STATUS.REJECTED && <>Произошла ошибка</>}
    </div>
  );
});