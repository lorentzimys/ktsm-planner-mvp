import React from 'react';

interface TotalProps {
  selectedLength: number;
  totalLength: number;
}

export const Total = ({ selectedLength, totalLength }: TotalProps) => {
  return (
    <>
      <span className="">Выбрано</span>
      <span className="font-semibold">
        {selectedLength} из{' '} {totalLength} 
      </span>
    </>
  )
}