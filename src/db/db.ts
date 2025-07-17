import PouchDB from 'pouchdb-browser';
import { Entry } from '../types/entry/entry';
import { store } from '../state/store';

const localDB = new PouchDB<Entry>(import.meta.env.VITE_LOCAL_DB);

const remoteDB = new PouchDB<Entry>(import.meta.env.VITE_REMOTE_DB, {
  skip_setup: false,
});

localDB.replicate
  .from(remoteDB, {
    live: true,
    retry: true,
  })
  .on('change', (info) => {
    console.log('Replication change', info);
    store.ui.aside.entries.set(
      info.docs.map((_item) => ({
        slug: _item._id,
        id: _item._id,
        title: _item.title,
        type: _item.entryType,
      })),
    );
  })
  .on('error', (err) => console.error('Replication error', err));

export default localDB;
