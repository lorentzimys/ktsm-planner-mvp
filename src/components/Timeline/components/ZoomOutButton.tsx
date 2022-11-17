import { forwardRef } from 'react';
import Timeline from 'react-visjs-timeline';

interface IVisTimelineZooOutButtonProps {}

export const ZoomOutButton = forwardRef<Timeline, IVisTimelineZooOutButtonProps>((props, timelineRef) => {
  const handleZoomOut = () => {
    if (timelineRef != null && typeof timelineRef !== 'function') {
      timelineRef.current.$el.zoomOut(0.5);
    }
  };

  const buttonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
      />
    </svg>
  );

  return (
    <button
      onClick={handleZoomOut}
      title="Уменьшить масштаб"
      className="inline-block px-1 py-1 text-black-600 hover:text-blue-700  transition duration-150 ease-in-out"
    >
      {buttonIcon}
    </button>
  );
});
