import React from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../../store";
import { VisGantt } from "../../components/Gantt";

const centerContentClassName = "flex flex-1 flex-col justify-center place-content-center content-center items-center overflow-hidden m-8 border shadow-sm";

export const PlanningPage = () => {
  const data = useSelector((state: RootState) => state.wizard.plan.data);
  const planningStatus = useSelector((state: RootState) => state.wizard.plan.status);

  return (
    <div className="flex flex-1">
      {planningStatus === 'pending' && <div className={centerContentClassName}>Загрузка данных...</div>}
      {planningStatus === 'fulfilled' && <VisGantt data={data}/>}
      {planningStatus === 'rejected' && <div className={centerContentClassName}>Произошла ошибка...</div>}
    </div>
  )
};