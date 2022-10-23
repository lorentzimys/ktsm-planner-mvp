import clsx from 'clsx';
import { createRoot } from 'react-dom/client';
import { useSelector } from 'react-redux';
import Timeline from 'react-visjs-timeline';
import { TimelineGroup, TimelineItem } from 'vis';
import { RootState } from '../../store';
import { PlanVariantSelect } from '../PlanVariantSelect';
import { ToggleLegendButton } from '../ToggleLegendButton';
import { ViewVariantButtonGroup } from '../ViewVariantButtonGroup';

import { ItemTemplate } from './components/ItemTemplate';
import { TimelineLegend } from './components/TimelineLegend';
// import { ViewMode, ViewSwitcher } from './components/ViewSwitcher';

import './index.css';

interface VisGanttProps {
  data: {
    totalTime: string | null,
    groups: TimelineGroup[],
    items: TimelineItem[],
    legendItems: TimelineGroup[],
    table: any;
  };
  options?: any;
};

export const VisGantt = ({ data } : VisGanttProps) => {

  const defaultOptions = {
    width: '100%',
    height: '100%',
    stack: false,
    stackSubgroups: false,
    locale: 'ru',
    showMajorLabels: true,
    showCurrentTime: true,
    verticalScroll: true,
    horizontalScroll: true,
    zoomKey: 'ctrlKey',
    zoomMin: 1000000,
    type: 'range',
    orientation: {
      axis: 'top',
      item: 'top'
    },
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    },
    template: function (item: TimelineItem, element: HTMLElement) {
        if (!item) { return }
        
        return createRoot(element).render(<ItemTemplate item={item} />);
    },
  }
  const legendVisible = useSelector((state: RootState) => state.wizard.plan.showLegend);

  const legendClassNames = clsx('p-4 w-2/12 overflow-hidden relative h-full collapse collapse-horizontal bg-neutral-200 shadow-sm', {
    'show': legendVisible
  });

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex flex-row flex-1'>
        <div className='flex flex-col flex-1'>
          <div className='w-full block h-full timeline__container'>
            <Timeline options={defaultOptions} items={data.items} groups={data.groups} />
          </div>
        </div>
        <div className={legendClassNames}>
          <TimelineLegend items={data.legendItems} />
        </div>
      </div>
      <div className='flex flex-row justify-between items-center bg-neutral-100'>
        <div className='p-2 flex flex-row gap-4 items-middle'>
          <ViewVariantButtonGroup />
          <PlanVariantSelect />
        </div>
        <div className='flex flex-row gap-1'>
          <ToggleLegendButton />
          <div className='text-xs flex flex-row gap-1 my-1 mx-4 text-right items-center shadow-sm'>
            Время планирования:<br/>
            {data.totalTime}
          </div>
        </div>
      </div>
    </div>
  );
}