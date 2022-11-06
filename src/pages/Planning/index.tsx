import React from "react";
import { useSelector } from 'react-redux';

import { RootState } from "@/store";
import { useAppDispatch } from "../../hooks/hooks";
import { VisGantt } from "@components/Gantt";
import Grid from "@components/Grid";
import { resourcesColumns } from "../../config/columnsConfig";
import { ViewVariantButtonGroup } from "@components/ViewVariantButtonGroup";
import { PlanVariantSelect } from "@components/PlanVariantSelect";
import { ViewVariantDropdown } from "@components/ViewVariantDropdown";
import { runPlan } from "@/store/slice";

const centerContentClassName = "flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden";



export const PlanningPage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => {
    const selectedPlan = state.plan.selectedPlan as number;
    return state.plan.data[selectedPlan]
  });
  const viewVariant = useSelector((state: RootState) => state.plan.viewVariant);
  const planningStatus = useSelector((state: RootState) => state.plan.status);

  const handlePlan = () => {
    dispatch(runPlan());
  }

  const handlePlanButton = (
    <button
      onClick={handlePlan}
      className="button button__primary button--small">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
        Запустить планирование
  </button>
  )

  return (
    <div className="flex flex-1">
      {planningStatus === 'idle' && (
        <div className="flex-col gap-2 page-content--center">{handlePlanButton}</div>
      )}
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
                  {/* <ViewVariantButtonGroup /> */}
                  <ViewVariantDropdown />
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