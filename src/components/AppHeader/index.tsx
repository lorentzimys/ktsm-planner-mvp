import React, { useState } from 'react';
import {
  Link,
} from 'react-router-dom';

export const AppHeader = ({ handleGridOpen, handleGanttOpen }) => {
  return (
    <header className='flex flex-col items-start justify-center p-10 gap-10 h-[20vh] bg-slate-500'>
      <h1 className='flex font-semibold text-3xl text-white fo'>Планировщик участка 4.1 Потока МПГ</h1>
      <div className='flex gap-2'>
        <Link className='button' to="/">Выбор партий</Link>
        <Link className='button' to="/planner">План производства</Link>
        {/* <button className='button' onClick={handleGridOpen}>Выбор партий</button> */}
        {/* <button className='button' onClick={handleGanttOpen}>План производства</button> */}
      </div>
    </header>
  )
}