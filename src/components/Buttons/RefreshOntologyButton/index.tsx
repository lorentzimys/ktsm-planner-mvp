import { RefreshIcon } from "@components/Icons/Refresh";
import { useAppDispatch } from "@hooks/hooks";
import { RootState } from "@store";
import { refreshOntology } from "@store/slice";
import clsx from "clsx";
import { useSelector } from "react-redux";

export const RefreshOntologyButton = () => {
  const dispatch = useAppDispatch();
  const ontologyPending = useSelector((state: RootState) => state.ontology.status === 'pending');
  const refreshDisallowed = useSelector((state: RootState) => {
    return ontologyPending || state.plan.status === 'pending'
  });

  const handleRefreshOntology = () => {
    dispatch(refreshOntology());
  }

  const classNames = clsx("w-4 h-4", {
    'animate-spin': ontologyPending
  })

  return (
    <button
      onClick={handleRefreshOntology}
      disabled={refreshDisallowed}
      className="disabled:opacity-50 disabled:cursor-not-allowed button button__primary button--small gap-2">
      <RefreshIcon  className={classNames}/>
      Синхр. КО
    </button>
  )
}