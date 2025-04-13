import { useLocation } from 'react-router';
import NestedList from '../components/NestedList';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';
import useEntries from '../hooks/useEntries';
import useCurrentEntry from '../hooks/useCurrentEntry';
import {
  DiaryEntry,
  isDiaryLeafEntry,
  isEncryptedDiaryEntry,
} from '../types/entry/diary';
import ContentViewer from '../components/ContentViewer';
import { BlockElement } from '../types/entry/content';

const Dairy = () => {
  const entries = useEntries<DiaryEntry>('diary');
  const location = useLocation();
  const currentEntry = useCurrentEntry<DiaryEntry>('diary', location.pathname);

  if (
    !currentEntry ||
    isEncryptedDiaryEntry(currentEntry) ||
    !isDiaryLeafEntry(currentEntry)
  ) {
    console.log(!currentEntry);
    return (
      <div className="diary">
        <PdaAsideBase title="Deník">
          <NestedList data={entries} prefix="denik" />
        </PdaAsideBase>
        <PdaSectionBase title={`#`}>
          <p>Dostupné informace o postavách, které mužeš potkat v sektoru</p>
        </PdaSectionBase>
      </div>
    );
  }

  return (
    <div className="diary">
      <PdaAsideBase title="Deník">
        <NestedList data={entries} prefix="denik" />
      </PdaAsideBase>
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
          content={
            currentEntry.container.content.entry
              .additionalContent
          }
        />
      </PdaSectionBase>
    </div>
  );
};

export default Dairy;
