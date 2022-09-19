import React from "react";
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import addDays from 'date-fns/addDays'

import { useSelector } from 'react-redux';
import { IDataState } from '../../store/dataSlice';

export const PlanningScreen = () => {
  const data = useSelector(({ data }: { data: IDataState }) => data.value);

  const mapDataToTasks = () => (
    data.map(d => ({
      id: d.id,
      name: d.nomenclature.name,
      start: new Date(),
      end: addDays(new Date(), 10),
      progress: 0,
    // custom_class?: string;
    // setDependencies(value: string[]): void;
    // dependencies: string;
    }))
  )

  return (
    <div>
      { data && data.length && (
        <FrappeGantt
          tasks={mapDataToTasks()}
          viewMode={ViewMode.Day}
          onClick={task => console.log(task)}
          onDateChange={(task, start, end) => console.log(task, start, end)}
          onProgressChange={(task, progress) => console.log(task, progress)}
          onTasksChange={tasks => console.log(tasks)}
        />
      )}
    </div>
  )
};