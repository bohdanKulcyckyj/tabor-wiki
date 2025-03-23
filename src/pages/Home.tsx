import { useEffect } from 'react';
import { store } from '../state/store';
import localDB from '../db/db';
import { useSelector } from '@legendapp/state/react';

const Home = () => {
  const entries = useSelector(store.entries);

  useEffect(() => {
    localDB.allDocs({ include_docs: true }).then((result) => {
      console.log(result);
      store.entries.set(result.rows.map((row) => row.doc!));
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry?._id}>{entry?.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
