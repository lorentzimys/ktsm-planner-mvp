import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@store';
import { ExcelIcon } from '@components/Icons/Excel';

export const ExportXlsButton = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const selectedPlan = useSelector(
    (state: RootState) => state.plan.data[state.plan.selectedPlan]
  );
  const hadleExportXls = () => {
    console.log('export xls');
    const target = linkRef.current;

    if (target) {
      target.click();
    }
  };

  return (
    <button
      onClick={hadleExportXls}
      className="disabled:opacity-50 align-middle disabled:cursor-not-allowed button button__secondary button--small gap-2 shadow-none"
    >
      <ExcelIcon />
      <a
        style={{ display: 'none' }}
        ref={linkRef}
        download={selectedPlan.name}
        href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${selectedPlan.base64}`}
      >
        Download
      </a>
    </button>
  );
};
