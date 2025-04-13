import { useParams } from 'react-router';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';

const Tasks = () => {
  const params = useParams();

  return (
    <div className="tasks">
      <PdaAsideBase title="Úkoly" className="">
        {/* <NestedList /> */}
        <></>
      </PdaAsideBase>
      <PdaSectionBase title={`# ${params['*'] ?? ''}`} className="">
        <div></div>
      </PdaSectionBase>
    </div>
  );
};

export default Tasks;
