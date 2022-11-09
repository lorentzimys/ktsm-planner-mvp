import { useSelector } from "react-redux";

import { WizardStep } from "@store/slice";

import { Stepper } from "@components/Stepper";
import WizardToolbar from "@components/WizardToolbar";
import { RootState } from "@/store";
import { EquipmentPage, ImportNomenclaturePage, OpeationsPage, PlanningPage, SelectNomenclaturePage } from "@pages";


const WizardLayout = () => {
  const currentStep = useSelector((state: RootState) => state.steps[state.currentStep]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shadow-sm shadow-gray-400 z-50">
        <Stepper />
      </div>
      <div className="flex flex-1 overflow-auto">
        {currentStep.id === WizardStep.Import.id && (<ImportNomenclaturePage />)} 
        {currentStep.id === WizardStep.SelectNomenclature.id && (<SelectNomenclaturePage />)} 
        {currentStep.id === WizardStep.SelectOperations.id && (<OpeationsPage />)} 
        {currentStep.id === WizardStep.SelectResources.id && (<EquipmentPage />)} 
        {currentStep.id === WizardStep.Plan.id && (<PlanningPage />)} 
      </div>
      <div className="shadow-md shadow-gray-600 z-50">
        <WizardToolbar />
      </div>
    </div>
  )
}

export default WizardLayout;