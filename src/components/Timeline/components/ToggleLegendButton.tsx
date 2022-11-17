import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/hooks';
import { RootState } from '@/store';
import { toggleLegend } from '@store/slice';

export const ToggleLegendButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const legendEnabled = useSelector(
    (state: RootState) => state.plan.showLegend
  );

  const handleLegendToggle = (e) => {
    dispatch(toggleLegend(e.target.checked));
  };

  return (
    <div className="flex self-center">
      <div className="form-check form-switch">
        <label className="form-check-label inline-block text-gray-800">
          Легенда
        </label>
        <input
          checked={legendEnabled}
          onChange={handleLegendToggle}
          className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
          type="checkbox"
          role="switch"
        />
      </div>
    </div>
  );
};
