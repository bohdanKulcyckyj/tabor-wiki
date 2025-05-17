import { useLocation } from 'react-router';
import PdaAsideBase from '../components/PdaAside';
import PdaSectionBase from '../components/PdaSection';
import useEntries from '../hooks/useEntries';
import useCurrentEntry from '../hooks/useCurrentEntry';
import NestedList from '../components/NestedList';
import DecryptEntryMiddleware from '../components/DecryptEntryMiddleware';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';
import { isTaskLeafEntry, TaskEntry } from '../types/entry/task';
import ContentViewer from '../components/ContentViewer';
import CheckList from '../components/CheckList';

const Tasks = () => {
  const { data: entries } = useEntries<TaskEntry>('task');
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);
  const location = useLocation();
  const { currentEntry } = useCurrentEntry<TaskEntry>(
    location.pathname,
    'task',
  );

  if (!currentEntry || !isTaskLeafEntry(currentEntry)) {
    return (
      <div className="tasks">
        <PdaAsideBase title="Ukoly">
          <NestedList data={entries} prefix="ukoly" />
        </PdaAsideBase>
        <DecryptEntryMiddleware>
          <PdaSectionBase title={`#`}>
            <p>Dostupné ukoly v sektoru</p>
          </PdaSectionBase>
        </DecryptEntryMiddleware>
      </div>
    );
  }

  return (
    <div className="tasks">
      <PdaAsideBase title="Ukoly">
        <NestedList data={entries} prefix="ukoly" />
      </PdaAsideBase>
      <DecryptEntryMiddleware>
        <PdaSectionBase title={`# ${currentEntry.title}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam,
            aspernatur? Repudiandae libero praesentium odio tenetur fugit omnis
            asperiores deleniti officia unde velit cupiditate, illo enim ut in
            voluptatem quasi ex. Error delectus odio iusto velit a excepturi
            fugiat minima maxime dolorum obcaecati! Molestiae quae similique
            asperiores laudantium saepe porro eveniet a cum adipisci nesciunt
            doloremque dolore aperiam veritatis, tempora cumque. Provident
            dignissimos quidem cumque iure. Dicta accusantium corporis soluta
            reprehenderit voluptatibus quasi amet quae laboriosam doloribus
            nihil quod maxime commodi fugiat porro eos, repellat quam
            dignissimos deserunt minima sint facere.
          </p>

          <CheckList
            uniqueId={currentEntry.id}
            data={currentEntry.container.content.entry.objectives}
          />

          <div className="tasks__item">
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

          {currentEntry.container.content.entry.additionalContent && (
            <ContentViewer
              content={currentEntry.container.content.entry.additionalContent}
            />
          )}
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

export default Tasks;
