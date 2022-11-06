import { useRef } from "react";
import { useSelector } from 'react-redux';

import { RootState } from "@/store";
import { useAppDispatch } from "../../hooks/hooks";
import { VisTimeline } from "@/components/Timeline";
import Grid from "@components/Grid";
import { resourcesColumns } from "../../config/columnsConfig";
import { PlanVariantSelect } from "@components/PlanVariantSelect";
import { ViewVariantDropdown } from "@components/ViewVariantDropdown";
import { runPlan } from "@/store/slice";

import { PlanToolbar } from "@components/PlanToolbar";
import { Timeline } from "vis";
import { ZoomInButton } from "@/components/Timeline/components/ZoomInButton";
import { ToggleLegendButton } from "@/components/Timeline/components/ToggleLegendButton";
import { ZoomOutButton } from "@/components/Timeline/components/ZoomOutButton";

export const PlanningPage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => {
    const selectedPlan = state.plan.selectedPlan as number;
    return state.plan.data[selectedPlan]
  });
  const viewVariant = useSelector((state: RootState) => state.plan.viewVariant);
  const planningStatus = useSelector((state: RootState) => state.plan.status);
  const timelineRef = useRef<Timeline>(null);
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
      {planningStatus === 'pending' && (
        <div className="page-content--center">Загрузка данных...</div>
      )}
      {planningStatus === 'fulfilled' && (
        <div className="flex flex-1 flex-col">
          {viewVariant === 'timeline' && <VisTimeline data={data} ref={ timelineRef } />}
          {viewVariant === 'consolidationInfo' && (
            <div className="flex flex-1 place-content-center self-center m-8">
              <Grid data={data.table} columnsConfig={resourcesColumns} />
            </div>
          )}
          {viewVariant === 'feConversionInfo' && (
            <div className="flex flex-1 place-content-center self-center m-8">
              <Grid data={data.table} columnsConfig={resourcesColumns} />
            </div>
          )}
          {viewVariant === 'scrapPowderConversionInfo' && (
            <div className="flex flex-1 place-content-center self-center m-8">
              <Grid data={data.table} columnsConfig={resourcesColumns} />
            </div>
          )}
          <PlanToolbar>
            {viewVariant === 'timeline' && (
              <>
                <div className='flex flex-row justify-items-center align-middle mr-4'>
                  <ZoomOutButton ref={timelineRef} />
                  <ZoomInButton ref={timelineRef} />
                </div>
                <ToggleLegendButton />
                <div className='text-xs flex flex-row gap-1 my-1 mx-4 text-right items-center shadow-sm'>
                  Время планирования:<br/>
                  {data.totalTime}
                </div>
              </>  
            )}
          </PlanToolbar>
        </div>
      )}
      {planningStatus === 'rejected' && <div className="page-content--center">Произошла ошибка...</div>}
    </div>
  )
};