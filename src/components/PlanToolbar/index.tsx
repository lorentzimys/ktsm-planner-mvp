import { ViewVariantDropdown } from '@/components/ViewVariantDropdown';

export const PlanToolbar = (props) => {
  return (
    <div className="flex flex-row justify-between items-cente">
      <div className="p-2 flex flex-row gap-4 items-center">
        <ViewVariantDropdown />
      </div>
      <div className="flex flex-row gap-2 tems-center align-middle">
        {props.children && props.children}
      </div>
    </div>
  );
};
