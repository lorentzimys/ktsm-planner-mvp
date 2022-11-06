import React, { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { RowSelectionState } from "@tanstack/react-table";


import { resourcesColumns } from "@config/columnsConfig";
import { RootState } from "@store"
import { changeEquipmentSelection, fetchEquipment, FETCH_STATUS } from "@store/slice";
import Grid from "@components/Grid";
import { useAppDispatch } from "@hooks";

const wrapperClassNames = "flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden m-8";

export const EquipmentPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.equipment.data);
  const fetchStatus = useSelector((state: RootState) => state.equipment.status);
  const selected = useSelector((state: RootState) => state.equipment.selected);
  const handleRowSelectionChange = useCallback((rowSelection: RowSelectionState) => {
    dispatch(changeEquipmentSelection(rowSelection));
  }, []);

  const handleUpdateData = () => {
    dispatch(fetchEquipment());
  }

  useEffect(() => {
    if (!data) {
      dispatch(fetchEquipment());
    }
  }, [data])

  const updateButton = (
    <>
      <span>Данные оборудования отсутствуют</span><br/>
      <button
        onClick={handleUpdateData}
        className="button button__primary button--small">
          Обновить данные
      </button>
    </>
  )

  return (
    <div className={wrapperClassNames}>
      {fetchStatus === FETCH_STATUS.PENDING && <>Загрузка данных...</>}
      {fetchStatus === FETCH_STATUS.FULFILLED &&
        (
          (data && data.length) ? (
            <Grid
              data={data}
              useSelection={{
                columnId: 'isAvailable',
                selectionState: selected
              }}
              columnsConfig={resourcesColumns}
              onRowSelectionChange={handleRowSelectionChange}
            />
          ) : updateButton
        )
      }
      {fetchStatus === FETCH_STATUS.REJECTED && <>Произошла ошибка</>}
    </div>
  );
});