import { useLocation } from 'react-router';
import NestedList from '../components/NestedList';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';
import useCurrentEntry from '../hooks/useCurrentEntry';
import {
  DiaryEntry,
  isDiaryLeafEntry,
} from '../types/entry/diary';
import ContentViewer from '../components/ContentViewer';
import DecryptEntryMiddleware from '../components/DecryptEntryMiddleware';
import useEntries from '../hooks/useEntries';

const Dairy = () => {
  const { data: entries } = useEntries<DiaryEntry>('diary');
  const location = useLocation();
  const { currentEntry } = useCurrentEntry<DiaryEntry>(location.pathname, 'diary');

  if (!currentEntry || !isDiaryLeafEntry(currentEntry)) {
    return (
      <div className="diary">
        <PdaAsideBase title="Deník">
          <NestedList data={entries} prefix="denik" />
        </PdaAsideBase>
        <DecryptEntryMiddleware>
          <PdaSectionBase title={`#`}>
            <p>Dostupné informace o postavách, které mužeš potkat v sektoru</p>
          </PdaSectionBase>
        </DecryptEntryMiddleware>
      </div>
    );
  }

  return (
    <div className="diary">
      <PdaAsideBase title="Deník">
        <NestedList data={entries} prefix="denik" />
      </PdaAsideBase>
      <DecryptEntryMiddleware>
        <PdaSectionBase title={`# ${currentEntry.title}`}>
          <div className="diary__bio">
            <div className="diary__bio__image">
              <img
                src={`data:image/jpeg;base64,${currentEntry.container.content.entry.profilePicture}`}
                alt="Diary"
              />
            </div>
            <ul className="diary__bio__text">
              <li>
                <p>Jméno/Příjmení:</p>
                <p>{currentEntry.container.content.entry.fullName}</p>
              </li>
              <li>
                <p>Přezdívka:</p>
                <p>{currentEntry.container.content.entry.nickname}</p>
              </li>
              <li>
                <p>Frakce:</p>
                <p className="text-yellow">
                  {currentEntry.container.content.entry.faction}
                </p>
              </li>
              <li>
                <p>Funkce:</p>
                <p>{currentEntry.container.content.entry.rank}</p>
              </li>
              <li>
                <p>Působnost v Sektoru:</p>
                <p>{currentEntry.container.content.entry.timeSpentInSector}</p>
              </li>
              <li>
                <p>Arzenál:</p>
                <p>{currentEntry.container.content.entry.arsenal}</p>
              </li>
            </ul>
          </div>
          <ContentViewer
            content={currentEntry.container.content.entry.additionalContent}
          />
        </PdaSectionBase>
      </DecryptEntryMiddleware>
    </div>
  );
};

export default Dairy;

