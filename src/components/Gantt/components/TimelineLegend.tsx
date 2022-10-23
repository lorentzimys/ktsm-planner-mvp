import React from "react";
import { TimelineGroup, TimelineItem } from "vis"

interface TimelineLegendProps {
  groups: TimelineGroup [];
  items: TimelineItem[];
}

export const TimelineLegend: React.FC<TimelineLegendProps> = ({ groups }) => { 

  return (
    <>
      <span className='text-s'>Легенда</span>
      <div className="overflow-scroll absolute h-full w-full py-2">
        <div className="flex flex-col gap-2">
          {
            groups.map(group => {
              return (
                <div className='flex flex-row leading-none items-center gap-2' key={group.id}>
                <div
                  css={(group as any).style}
                  style={{
                  width: '0.5em',
                  height: '0.5em',
                  borderRadius: 2,
                }}></div>
                <span
                  style={{
                    fontSize: 10,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: (group as any).content
                  }}
                />
              </div>)
            }
          )}
        </div>

      </div>
    </>
  )
}