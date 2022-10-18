import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const STEPS = {
  IMPORT_NOMENCLATURE: 'importNomenclature',
  SELECT_NOMENCLATURE: 'selectNomenclature',
  RESOURCES: 'resources',
  RUN_PLANNING: 'runPlanning'
};

export const Stepper = () => {
  const location = useLocation();

  console.log(location);
  return (
    <nav>
      <ul className="stepper" data-mdb-stepper="stepper">
        <Link to={STEPS.IMPORT_NOMENCLATURE} className="stepper-step stepper-active">
          <div className="stepper-head">
            <span className="stepper-head-icon"> 1 </span>
            <span className="stepper-head-text">
              <span>Загрузка<br/>номенклатуры</span>
            </span>
          </div>
          <div className="stepper-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </div>
        </Link>
        <Link to={STEPS.SELECT_NOMENCLATURE} className="stepper-step">
          <div className="stepper-head">
            <span className="stepper-head-icon"> 2 </span>
            <span className="stepper-head-text">
              <span>Выбор<br/>номенклатуры</span>
            </span>
          </div>
          <div className="stepper-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </div>
        </Link>
        <Link to={STEPS.RESOURCES} className="stepper-step">
          <div className="stepper-head">
            <span className="stepper-head-icon"> 3 </span>
            <span className="stepper-head-text"> Выбор<br/>оборудования </span>
          </div>
          <div className="stepper-content">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </Link>
        <Link to={STEPS.RUN_PLANNING} className="stepper-step">
          <div className="stepper-head">
            <span className="stepper-head-icon"> 4 </span>
            <span className="stepper-head-text"> Планирование<br/>ресурсов </span>
          </div>
          <div className="stepper-content">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>
        </Link>
      </ul>
    </nav>
  )
}