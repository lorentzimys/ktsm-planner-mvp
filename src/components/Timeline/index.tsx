import { forwardRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useSelector } from 'react-redux';
import Timeline from 'react-visjs-timeline';
import { TimelineGroup, TimelineItem } from 'vis';
import clsx from 'clsx';

import { RootState } from '@/store';

import { ItemTemplate } from './components/ItemTemplate';
import { TimelineLegend } from './components/TimelineLegend';

import './index.css';

import moment from 'moment-with-locales-es6';

moment.locale('ru');
interface VisTimelineProps {
  data: {
    totalTime: string | null;
    groups: TimelineGroup[];
    items: TimelineItem[];
    legendItems: TimelineGroup[];
    table: any;
  };
  options?: any;
}

export const VisTimeline = forwardRef<Timeline, VisTimelineProps>(({ data }: VisTimelineProps, ref) => {
  const defaultOptions = {
    moment: moment,
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
    zoomMax: 100000000000,
    type: 'range',
    orientation: {
      axis: 'top',
      item: 'top',
    },
    format: {
      minorLabels: {
        minute: 'H:M',
        hour: 'HH',
      },
    },
    template: function (item: TimelineItem, element: HTMLElement) {
      if (!item) {
        return;
      }

      return createRoot(element).render(<ItemTemplate item={item} />);
    },
  };

  const legendVisible = useSelector((state: RootState) => state.plan.showLegend);

  const legendClassNames = clsx(
    'p-4 w-3/12  overflow-hidden relative h-full overflow-hidden collapse-horizontal bg-neutral-200 shadow-sm',
    {
      show: legendVisible,
      collapse: !legendVisible,
    }
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-row flex-1">
        <div className="flex flex-col flex-1">
          <div className="w-full block h-full timeline__container">
            <Timeline ref={ref} options={defaultOptions} items={data.items} groups={data.groups} />
          </div>
        </div>
        <div className={legendClassNames}>
          <TimelineLegend items={data.legendItems} />
        </div>
      </div>
    </div>
  );
});
