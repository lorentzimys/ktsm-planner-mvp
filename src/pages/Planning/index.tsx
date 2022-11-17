import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Timeline } from 'vis';

import { RootState } from '@store';
import { refreshOntology, runPlan } from '@store/slice';

import { useAppDispatch } from '@hooks/hooks';
import { createColumnsConfigFromKeys } from '@config/columnsConfig';

import Grid from '@components/Grid';
import { VisTimeline } from '@components/Timeline';
import { PlanToolbar } from '@components/PlanToolbar';
import { getViewVariant } from '@components/ViewVariantDropdown';
import { ZoomInButton } from '@components/Timeline/components/ZoomInButton';
import { ZoomOutButton } from '@components/Timeline/components/ZoomOutButton';
import { ToggleLegendButton } from '@components/Timeline/components/ToggleLegendButton';
import { PlanVariantSelect } from '@components/PlanVariantSelect';

import Lottie from 'react-lottie';
import * as calendarAnimation from './calendar-animation.json';
import * as errorOccured from './error-occurred.json';
import { ExportXlsButton } from '@components/Buttons/ExportXlsButton';

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const PlanningPage = () => {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => {
    return state.plan.data[state.plan.selectedPlan];
  });
  const ontologyLoaded = useSelector((state: RootState) => {
    return state.ontology.status === 'fulfilled';
  });
  const viewVariant = useSelector((state: RootState) => state.plan.viewVariant);
  const planningStatus = useSelector((state: RootState) => state.plan.status);
  const planningAllowed = useSelector((state: RootState) => {
    return Boolean(
      (state.nomenclature?.data?.length ?? false) &&
        state.ontology.status !== 'pending' &&
        planningStatus !== 'pending'
    );
  });
  const timelineRef = useRef<Timeline>(null);
  const handlePlan = async () => {
    if (!ontologyLoaded) {
      await dispatch(refreshOntology());
    }
    dispatch(runPlan());
  };

  const HandlePlanButton = ({ children }) => (
    <button
      onClick={handlePlan}
      disabled={!planningAllowed}
      className="disabled:opacity-50 gap-2 text-xs disabled:cursor-not-allowed button button__primary button--small"
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-1 w-full">
      {planningStatus === 'idle' && (
        <div className="flex-col gap-2 page-content--center">
          <HandlePlanButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
            Построить план
          </HandlePlanButton>
        </div>
      )}
      {planningStatus === 'pending' && (
        <div className="page-content--center flex flex-col gap-4">
          <Lottie
            options={{
              ...defaultOptions,
              animationData: calendarAnimation,
            }}
            height={200}
            width={200}
            isStopped={false}
            isPaused={false}
          />
          Подождите, строим план...
        </div>
      )}
      {planningStatus === 'fulfilled' && (
        <div className="flex flex-1 flex-col w-full">
          <div className="mx-4 my-2 flex flex-row justify-between ">
            <h2 className="header-5 flex flex-col text-gray-800">
              <PlanVariantSelect />
            </h2>
            <div className="flex flex-row items-center">
              <ExportXlsButton />
              <PlanToolbar />
            </div>
          </div>
          {viewVariant === 'timeline' && (
            <VisTimeline data={data as any} ref={timelineRef} />
          )}
          {(viewVariant === 'consolidationInfo' ||
            viewVariant === 'feConversionInfo' ||
            viewVariant === 'scrapPowderConversionInfo') && (
            <div className="px-4 py-2 flex flex-1 flex-col w-full overflow-hidden">
              <Grid
                data={data.items}
                columnsConfig={createColumnsConfigFromKeys(
                  Object.keys(data[viewVariant as any][0] || {})
                )}
              />
            </div>
          )}
          {viewVariant === 'timeline' && (
            <div className="flex flex-row justify-between px-3 py-1 bg-neutral-100">
              <div className="flex flex-row justify-items-center gap-4 align-middle">
                <div>
                  <ZoomOutButton ref={timelineRef} />
                  <ZoomInButton ref={timelineRef} />
                </div>
                <ToggleLegendButton />
              </div>
              <div className="text-xs flex flex-row my-1 gap-2 items-center">
                <span>Время планирования:</span>
                {data?.totalTime ?? ''}
              </div>
            </div>
          )}
        </div>
      )}
      {planningStatus === 'rejected' && (
        <div className="page-content--center flex flex-col gap-4">
          <Lottie
            options={{
              ...defaultOptions,
              animationData: errorOccured,
            }}
            height={160}
            width={160}
            isStopped={false}
            isPaused={false}
          />
          Произошла ошибка...
        </div>
      )}
    </div>
  );
};
