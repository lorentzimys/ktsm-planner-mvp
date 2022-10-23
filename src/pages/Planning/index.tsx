import React from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../../store";
import { VisGantt } from "../../components/Gantt";
import Grid from "../../components/Grid";
import { resourcesColumns } from "../../config/columnsConfig";
import { ViewVariantButtonGroup } from "../../components/ViewVariantButtonGroup";
import { PlanVariantSelect } from "../../components/PlanVariantSelect";

const centerContentClassName = "flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden";

export const PlanningPage = () => {
  const data = useSelector((state: RootState) => {
    const selectedPlan = state.wizard.plan.selectedPlan as number;
    return state.wizard.plan.data[selectedPlan]
  });
  const viewVariant = useSelector((state: RootState) => state.wizard.plan.viewVariant);
  const planningStatus = useSelector((state: RootState) => state.wizard.plan.status);

  return (
    <div className="flex flex-1">
      {planningStatus === 'pending' && <div className={centerContentClassName}>Загрузка данных...</div>}
      {planningStatus === 'fulfilled' && (
        <div className="flex flex-1 flex-col">
          {viewVariant === 'timeline' && <VisGantt data={data} />}
          {viewVariant === 'table' && (
            <>
              <div className="flex flex-1 place-content-center self-center m-8">
                <Grid data={data.table} columnsConfig={resourcesColumns} />
              </div>
              <div className='flex flex-row justify-between items-center bg-neutral-100'>
                <div className='p-2 flex flex-row gap-4 items-middle'>
                  <ViewVariantButtonGroup />
                  <PlanVariantSelect />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {planningStatus === 'rejected' && <div className={centerContentClassName}>Произошла ошибка...</div>}
    </div>
  )
};