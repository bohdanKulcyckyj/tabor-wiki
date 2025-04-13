import { useParams } from 'react-router';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';

const Encyclopedia = () => {
  const params = useParams();

  return (
    <div className="encyclopedia">
      <PdaAsideBase title="Encyclopedia" className="">
        {/* <NestedList /> */}
        <></>
      </PdaAsideBase>
      <PdaSectionBase title={`# ${params["*"] ?? ""}`} className="">
        <div></div>
      </PdaSectionBase>
    </div>
  );
};

export default Encyclopedia;
