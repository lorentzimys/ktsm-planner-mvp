import React from 'react';

export const ViewMode = {
  Hour: 'hour',
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Year: 'yearmonth',
}

type ViewSwitcherProps = {
  onViewModeChange: (viewMode: any) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ onViewModeChange }) => (
  <div className='flex items-center'>
    <div className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg' role='group'>
      <button 
        type='button'
        onClick={() => onViewModeChange(ViewMode.Hour)}
        className='rounded-l inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
      >
        Час
      </button>
      
      <button
        onClick={() => onViewModeChange(ViewMode.Day)}
        type='button'
        className='inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
      >
        День
      </button>
      <button 
        type='button'
        onClick={() => onViewModeChange(ViewMode.Week)}
        className='inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
      >
        Неделя
      </button>
      <button 
        onClick={() => onViewModeChange(ViewMode.Year)}
        type='button'
          className='inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
        >
          Месяц
        </button>
        
        <button 
          type='button'
          onClick={() => onViewModeChange(ViewMode.Year)}
          className='rounded-r inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
        >
          Год
        </button>
      </div>
    </div>
  );