import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"

import { WizardStep } from "../../store/wizard/slice";

import { Stepper } from "../../components/Stepper";
import WizardToolbar from "../../components/WizardToolbar";


const WizardLayout = () => {
  const navigate = useNavigate();
  const currentStep = useSelector(({ wizard }: any) => wizard.currentStep);
  
  useEffect(() => {
    navigate(`/plan/${Object.values(WizardStep)[currentStep].id}`);
  }, [currentStep]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shadow-sm shadow-gray-400 z-50">
        <Stepper />
      </div>
      <div className="flex flex-1 overflow-auto">
        <Outlet />
      </div>
      <div className="shadow-md shadow-gray-600 z-50">
        <WizardToolbar />
      </div>
    </div>
  )
}

export default WizardLayout;