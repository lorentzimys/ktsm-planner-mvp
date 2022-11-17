import React, { HTMLProps } from 'react';

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
};

export const CheckboxHeaderCell = React.memo(({ table }: any) => (
  <IndeterminateCheckbox
    {...{
      checked: table.getIsAllRowsSelected(),
      indeterminate: table.getIsSomeRowsSelected(),
      onChange: table.getToggleAllRowsSelectedHandler(),
    }}
  />
));

export const CheckboxRowCell = React.memo(({ row }: any) => (
  <div className="px-1">
    <IndeterminateCheckbox
      {...{
        checked: row.getIsSelected(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
      }}
    />
  </div>
));
