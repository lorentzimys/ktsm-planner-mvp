import { RefreshIcon } from "@components/Icons/Refresh";
import { useAppDispatch } from "@hooks/hooks";
import { RootState } from "@store";
import { refreshOntology } from "@store/slice";
import { useSelector } from "react-redux";

export const RefreshOntologyButton = () => {
  const dispatch = useAppDispatch();
  const refreshDisallowed = useSelector((state: RootState) => {
    return state.ontology.status === 'pending'
      || state.plan.status === 'pending'
  });

  const handleRefreshOntology = () => {
    dispatch(refreshOntology());
  }

  return (
    <button
      onClick={handleRefreshOntology}
      disabled={refreshDisallowed}
      className="disabled:opacity-50 disabled:cursor-not-allowed button button__primary button--small gap-2">
      <RefreshIcon />
      Обновить онтологию
    </button>
  )
}