import React from "react";
import { FrappeGantt, ViewMode } from 'frappe-gantt-react';
import addDays from 'date-fns/addDays'

import { useSelector } from 'react-redux';
import { IDataState } from '../../store/dataSlice';
import { RootState } from "../../store";
import { KcmGantt } from "../../components/Gantt";

export const PlanningPage = () => {
  const data = useSelector((state: RootState) => state.wizard.nomenclature);

  const mapDataToTasks = (): any => {
    return data ? data.map(d => ({
      id: d.item_id,
      name: d.item_desc,
      start: new Date(),
      end: addDays(new Date(), 10),
      progress: 0,
      // custom_class?: string;
      // setDependencies(value: string[]): void;
      // dependencies: string;
    })) : []
  };

  return (
    <div>
      <KcmGantt />
      {/* { data && data.length && (
        <FrappeGantt
          tasks={mapDataToTasks()}
          viewMode={ViewMode.Day}
          onClick={task => console.log(task)}
          onDateChange={(task, start, end) => console.log(task, start, end)}
          onProgressChange={(task, progress) => console.log(task, progress)}
          onTasksChange={tasks => console.log(tasks)}
        />
      )} */}
    </div>
  )
};