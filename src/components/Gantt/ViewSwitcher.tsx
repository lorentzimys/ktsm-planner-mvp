import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";

import './index.css';

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="ViewContainer flex flex-row gap-2">
      <button
        className="gantt__button"
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Час
      </button>
      <button
        className="gantt__button"
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        6 ч.
      </button>
      <button
        className="gantt__button"
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        12 ч.
      </button>
      <button className="gantt__button" onClick={() => onViewModeChange(ViewMode.Day)}>
        День
      </button>
      <button
        className="gantt__button"
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Неделя
      </button>
      <button
        className="gantt__button"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Месяц
      </button>
      <button
        className="gantt__button"
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Год
      </button>
      {/* <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div> */}
    </div>
  );
};