import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"

import { resourcesColumns } from "../../config/columnsConfig";

import { RootState } from "../../store"
import { fetchEquipment, FETCH_STATUS } from "../../store/wizard/slice";

import { useAppDispatch } from "../../hooks/hooks";

import Grid from "../../components/Grid";

const wrapperClassNames = "flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden m-8 border shadow-sm";

export const EquipmentPage = React.memo(() => {
  const dispatch = useAppDispatch();
  const eqipment = useSelector((state: RootState) => state.wizard.equipment.items);
  const fetchStatus = useSelector((state: RootState) => state.wizard.equipment.status);

  useEffect(() => {
    if (!eqipment) {
      dispatch(fetchEquipment());
    }
  }, [eqipment])

  return (
    <div className={wrapperClassNames}>
      {fetchStatus === FETCH_STATUS.PENDING && <>Загрузка данных...</>}
      {fetchStatus === FETCH_STATUS.FULFILLED && (
        <Grid
          data={eqipment}
          useSelection={{
            columnId: 'isAvailable'
          }}
          columnsConfig={resourcesColumns}
        />
      )}
      {fetchStatus === FETCH_STATUS.REJECTED && <>Произошла ошибка</>}
    </div>
  );
});