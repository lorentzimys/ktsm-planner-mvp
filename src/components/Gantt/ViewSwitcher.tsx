import React from "react";

import './index.css';

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: any) => void;
};

// export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
//   onViewModeChange,
//   onViewListChange,
//   isChecked,
// }) => {
//   return (
//     <div className="ViewContainer flex flex-row gap-2">
//       <button
//         className="gantt__button"
//         onClick={() => onViewModeChange(any.Hour)}
//       >
//         Час
//       </button>
//       <button
//         className="gantt__button"
//         onClick={() => onViewModeChange(any.QuarterDay)}
//       >
//         6 ч.
//       </button>
//       <button
//         className="gantt__button"
//         onClick={() => onViewModeChange(any.HalfDay)}
//       >
//         12 ч.
//       </button>
//       <button className="gantt__button" onClick={() => onViewModeChange(any.Day)}>
//         День
//       </button>
//       <button
//         className="gantt__button"
//         onClick={() => onViewModeChange(any.Week)}
//       >
//         Неделя
//       </button>
//       <button
//         className="gantt__button"
//         onClick={() => onViewModeChange(any.Month)}
//       >
//         Месяц
//       </button>
//       <button
//         className="gantt__button"
//         onClick={() => onViewModeChange(any.Year)}
//       >
//         Год
//       </button>
//       {/* <div className="Switch">
//         <label className="Switch_Toggle">
//           <input
//             type="checkbox"
//             defaultChecked={isChecked}
//             onClick={() => onViewListChange(!isChecked)}
//           />
//           <span className="Slider" />
//         </label>
//         Show Task List
//       </div> */}
//     </div>
//   );
// };