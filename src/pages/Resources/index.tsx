import { useEffect } from "react";
import { useSelector } from "react-redux"
import Grid from "../../components/Grid";
import { resourcesColumns } from "../../components/Grid/columnsConfig";
import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "../../store"
import { fetchResources } from "../../store/wizard/slice";

export const ResourcesPage = () => {
  const dispatch = useAppDispatch();
  const resources = useSelector((state: RootState) => state.wizard.resources);

  useEffect(() => {
    if (resources === null) {
      dispatch(fetchResources());
    }
  }, [resources])

  return (
    <div className="flex flex-1 flex-col justify-center place-content-center content-center items-center">
      {
        resources ?
          <Grid data={resources} columnsConfig={resourcesColumns} /> :
          <>Nothing to show</>
      }
    </div>
  );
}