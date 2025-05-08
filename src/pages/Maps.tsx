import { useLocation } from 'react-router';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';
import useEntries from '../hooks/useEntries';
import { isMapLeafEntry, MapEntry } from '../types/entry/map';
import useCurrentEntry from '../hooks/useCurrentEntry';
import NestedList from '../components/NestedList';
import DecryptEntryMiddleware from '../components/DecryptEntryMiddleware';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';

const Maps = () => {
  const { data: entries } = useEntries<MapEntry>('map');
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);
  const location = useLocation();
  const { currentEntry } = useCurrentEntry<MapEntry>(location.pathname, 'map');

  if (!currentEntry || !isMapLeafEntry(currentEntry)) {
    return (
      <div className="maps">
        <PdaAsideBase title="Mapy">
          <NestedList data={entries} prefix="mapy" />
        </PdaAsideBase>
        <DecryptEntryMiddleware>
          <PdaSectionBase title={`#`}>
            <p>Dostupné mapy sektoru</p>
          </PdaSectionBase>
        </DecryptEntryMiddleware>
      </div>
    );
  }

  return (
    <div className="maps">
      <PdaAsideBase title="Mapy">
        <NestedList data={entries} prefix="mapy" />
      </PdaAsideBase>
      <DecryptEntryMiddleware>
        <PdaSectionBase title={`# ${currentEntry.title}`}>
          <div>
            <div className="maps__item">
              <img
                src={
                  currentEntry.container.content.entry.map.subtype === 'base64'
                    ? `data:image/*;base64,${currentEntry.container.content.entry.map.source}`
                    : currentEntry.container.content.entry.map.source
                }
                alt={currentEntry.title}
                onClick={() => setIsMapPreviewOpen(true)}
              />
            </div>
          </div>
          <Lightbox
            open={isMapPreviewOpen}
            close={() => setIsMapPreviewOpen(false)}
            slides={[
              {
                src:
                  currentEntry.container.content.entry.map.subtype === 'base64'
                    ? `data:image/*;base64,${currentEntry.container.content.entry.map.source}`
                    : currentEntry.container.content.entry.map.source,
              },
            ]}
          />
        </PdaSectionBase>
      </DecryptEntryMiddleware>
    </div>
  );
};

export default Maps;
