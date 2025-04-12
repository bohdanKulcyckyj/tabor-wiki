import { useLocation } from 'react-router';
import NestedList from '../components/NestedList';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';
import useEntries from '../hooks/useEntries';
import useCurrentEntry from '../hooks/useCurrentEntry';
import { isEncryptedDiaryEntry, isLeafEntry } from '../utils/entry';
import { DiaryEntry } from '../types/entry/diary';
import ContentViewer from '../components/ContentViewer';
import { BlockElement } from '../types/entry/content';

const Dairy = () => {
  const entries = useEntries<DiaryEntry>('diary');
  const location = useLocation();
  const currentEntry = useCurrentEntry<DiaryEntry>('diary', location.pathname);

  if (
    !currentEntry ||
    !isLeafEntry(currentEntry) ||
    isEncryptedDiaryEntry(currentEntry)
  ) {
    console.log(!currentEntry);
    return (
      <div className="diary">
        <PdaAsideBase title="Deník">
          <NestedList data={entries} prefix="denik" />
        </PdaAsideBase>
        <PdaSectionBase title={`# /`}>
          <p>404</p>
        </PdaSectionBase>
      </div>
    );
  }

  return (
    <div className="diary">
      <PdaAsideBase title="Deník">
        <NestedList data={entries} prefix="denik" />
      </PdaAsideBase>
      <PdaSectionBase title={`#  /${currentEntry.title}`}>
        <div className="diary__bio">
          <div className="diary__bio__image">
            <img
              src={`data:image/jpeg;base64,${currentEntry.content.profilePicture}`}
              alt="Diary"
            />
          </div>
          <ul className="diary__bio__text">
            <li>
              <p>Jméno/Příjmení:</p>
              <p>{currentEntry.content.fullName}</p>
            </li>
            <li>
              <p>Přezdívka:</p>
              <p>{currentEntry.content.nickname}</p>
            </li>
            <li>
              <p>Frakce:</p>
              <p className="text-yellow">{currentEntry.content.faction}</p>
            </li>
            <li>
              <p>Funkce:</p>
              <p>{currentEntry.content.rank}</p>
            </li>
            <li>
              <p>Působnost v Sektoru:</p>
              <p>{currentEntry.content.timeSpentInSector}</p>
            </li>
            <li>
              <p>Arzenál:</p>
              <p>{currentEntry.content.arsenal}</p>
            </li>
          </ul>
        </div>
        <div>
          <ContentViewer
            content={currentEntry.content.additionalContent as BlockElement[]}
          />
        </div>
      </PdaSectionBase>
    </div>
  );
};

export default Dairy;
