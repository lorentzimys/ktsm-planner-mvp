import Grid from "../../components/Grid";
import { useSelector } from "react-redux";
import { operationsColumnsConfig } from "../../components/Grid/columnsConfig";
import { RootState } from "../../store";

const OpeationsPage = () => {
  const data = useSelector((state: RootState) => state.wizard.operations);

  console.log(data);
  return (
    <div className='flex flex-1 overflow-hidden'>
      {data && (
        <Grid data={data} columnsConfig={operationsColumnsConfig} />
      )}
    </div>
  );
}

export default OpeationsPage;