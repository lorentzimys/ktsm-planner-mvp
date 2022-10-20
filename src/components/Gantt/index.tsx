import { addDays } from 'date-fns/esm';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { ViewSwitcher }  from './ViewSwitcher';
import 'gantt-task-react/dist/index.css';
import operations from '../../mocks/chop4_1_1_oper.json';
import { useState } from 'react';

// let tasks: Task[] = [
//   {
//     start: new Date(2020, 1, 1),
//     end: new Date(2020, 1, 2),
//     name: 'Idea',
//     id: 'Task 0',
//     type:'task',
//     progress: 45,
//     isDisabled: true,
//     styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
//   },
// ];

const tasks: Task[] = operations.map(o => ({
  start: new Date(o.first_job_start_local),
  end: addDays(new Date(o.first_job_start_local), Math.floor(Math.random() * 6) + 1),
  name: o.ent_desc,
  id: o.ent_id.toString() + Math.random(),
  type: 'task',
  progress: 0,
  isDisabled: false,
  styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
}));

export const KcmGantt = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  return (
    <>
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        viewMode={view}
        columnWidth={columnWidth}
      />
    </>
  )
}