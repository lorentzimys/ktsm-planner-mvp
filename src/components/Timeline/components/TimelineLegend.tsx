import React from 'react';
import { TimelineGroup } from 'vis';

interface TimelineLegendProps {
  items: TimelineGroup[];
}

export const TimelineLegend: React.FC<TimelineLegendProps> = ({ items }) => (
  <>
    <span className="text-s">Легенда</span>
    <div className="overflow-scroll absolute h-full w-full py-2">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            className="flex flex-row leading-none items-center gap-2"
            key={item.id}
          >
            <div
              css={item.style}
              style={{
                width: '0.5em',
                height: '0.5em',
                borderRadius: 2,
              }}
            ></div>
            <span
              style={{
                fontSize: 10,
              }}
              dangerouslySetInnerHTML={{
                __html: (item as any).content,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </>
);
