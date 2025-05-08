import { useLocation } from 'react-router';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';
import NestedList from '../components/NestedList';
import { EncyclopediaEntry, isEncyclopediaLeafEntry } from '../types/entry/encyclopedia';
import useCurrentEntry from '../hooks/useCurrentEntry';
import useEntries from '../hooks/useEntries';
import DecryptEntryMiddleware from '../components/DecryptEntryMiddleware';
import ContentViewer from '../components/ContentViewer';

const Encyclopedia = () => {
  const { data: entries } = useEntries<EncyclopediaEntry>('encyclopedia');
  const location = useLocation();
  const { currentEntry } = useCurrentEntry<EncyclopediaEntry>(location.pathname, 'encyclopedia');

  if (!currentEntry || !isEncyclopediaLeafEntry(currentEntry)) {
    return (
      <div className="encyclopedia">
        <PdaAsideBase title="Encyklopedie">
          <NestedList data={entries} prefix="encyklopedie" />
        </PdaAsideBase>
        <DecryptEntryMiddleware>
          <PdaSectionBase title={`#`}>
            <p>Dostupné informace o zone</p>
          </PdaSectionBase>
        </DecryptEntryMiddleware>
      </div>
    );
  }

  return (
    <div className="encyclopedia">
      <PdaAsideBase title="Encyklopedie" className="">
        <NestedList data={entries} prefix="encyklopedie" />
      </PdaAsideBase>
      <PdaSectionBase title={`# ${currentEntry.title}`}>
          <ContentViewer
            content={currentEntry.container.content.entry}
          />
        </PdaSectionBase>
    </div>
  );
};

export default Encyclopedia;
