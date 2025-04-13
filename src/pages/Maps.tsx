import { useParams } from "react-router";
import PdaAsideBase from "../components/PdaAside";
import PdaSectionBase from "../components/PdaSection";

const Maps = () => {
  const params = useParams();

  return (
    <div className="maps">
      <PdaAsideBase title="Mapy" className="">
        {/* <NestedList /> */}
        <></>
      </PdaAsideBase>
      <PdaSectionBase title={`# ${params["*"] ?? ""}`} className="">
        <div></div>
      </PdaSectionBase>
    </div>
  );
};

export default Maps;
