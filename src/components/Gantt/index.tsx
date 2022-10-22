import { useState } from 'react';
import Timeline from 'react-visjs-timeline';
import { addDays } from 'date-fns/esm';
// import { ViewSwitcher }  from './ViewSwitcher';
// import operations from '../../mocks/chop4_1_1_oper.json';

// const tasks: Task[] = operations.map(o => ({
//   start: new Date(o.first_job_start_local),
//   end: addDays(new Date(o.first_job_start_local), Math.floor(Math.random() * 6) + 1),
//   name: o.ent_desc,
//   id: o.ent_id.toString() + Math.random(),
//   type: 'task',
//   progress: 0,
//   isDisabled: false,
//   styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
// }));

interface VisGanttProps {
  data: VisGanttItem[];
  options?: any;
}

interface VisGanttItem {
  start: Date,
  end: Date,
  content: string
}

export const VisGantt = ({ data, options = undefined } : VisGanttProps) => {

  const defaultOptions = {
    width: '100%',
    height: '600px',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    type: 'background',
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    },
    ...options
  }

  return (
    <div className='w-full'>
      <Timeline options={defaultOptions} items={data} />);
    </div>
  );
}