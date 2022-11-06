import React from "react";
import { TimelineItem } from "vis"

interface ItemTemplateProps {
  item: TimelineItem;
}

export const ItemTemplate: React.FC<ItemTemplateProps> = ({ item }: ItemTemplateProps) => {
  return (
    <div
      className='text-xs overflow-hidden text-ellipsis inline-block w-full'
      dangerouslySetInnerHTML={{
        __html: item.content,
      }}
    />
  )
};
