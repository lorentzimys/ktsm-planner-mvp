import Timeline from 'react-visjs-timeline';
import { TimelineGroup, TimelineItem } from 'vis';


interface VisGanttProps {
  data: {
    groups: TimelineGroup[],
    items: TimelineItem[],
  };
  options?: any;
};

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
      <Timeline options={defaultOptions} items={data.items} groups={data.groups} />);
    </div>
  );
}