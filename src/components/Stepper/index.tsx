import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { WizardStep } from '../../store/wizardSlice'; 

export const Stepper = () => {
  const currentStep = useSelector(({ wizard }: any) => wizard.currentStep);

  return (
    <nav>
      <ul className="stepper" data-mdb-stepper="stepper">
        {
          Object.values(WizardStep).map((step, i) => {
            const className = clsx("stepper-step", { "stepper-active": currentStep === i });
            return (
              <Link to={step} className={className}>
                <div className="stepper-head">
                  <span className="stepper-head-icon">{i + 1}</span>
                  {/* <span className="stepper-head-text">
                    <span>Загрузка<br/>номенклатуры</span>
                  </span> */}
                </div>
                {/* <div className="stepper-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </div> */}
              </Link>
            )
          })
        }
        {/* <Link to={STEPS.IMPORT_NOMENCLATURE} className="stepper-step stepper-active">
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
        </Link> */}
      </ul>
    </nav>
  )
}