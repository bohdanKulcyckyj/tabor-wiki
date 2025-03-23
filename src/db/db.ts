import PouchDB from 'pouchdb-browser';
import { Entry } from '../types/entry';

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
  })
  .on('error', (err) => console.error('Replication error', err));

export default localDB;
