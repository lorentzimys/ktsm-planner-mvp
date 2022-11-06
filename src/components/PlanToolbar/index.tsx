import { PlanVariantSelect } from "@/components/PlanVariantSelect"
import { ViewVariantDropdown } from "@/components/ViewVariantDropdown"

export const PlanToolbar = (props) => {
  return (
    <div className='flex flex-row justify-between items-center bg-neutral-100'>
      <div className='p-2 flex flex-row gap-4 items-middle'>
        <ViewVariantDropdown />
        <PlanVariantSelect />
      </div>
      <div className='flex flex-row gap-2 justify-items-center align-middle'>
        {props.children && props.children}
      </div>
    </div>
  )
}