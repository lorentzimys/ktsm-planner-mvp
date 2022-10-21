import ImportNomenclaturePage from "./Import";
import Grid from "../../components/Grid";
import { useSelector } from "react-redux";
import { nomenclatureColumns } from "../../components/Grid/columnsConfig";
import { RootState } from "../../store";

const SelectNomenclaturePage = () => {
  const data = useSelector((state: RootState) => state.wizard.nomenclature);

  return (
    <div className='flex flex-1 overflow-hidden m-8 border shadow-sm'>
      {
        data && (
          <Grid data={data} columnsConfig={nomenclatureColumns} useSelection />
        )
      }
    </div>
  );
}

export { SelectNomenclaturePage, ImportNomenclaturePage };