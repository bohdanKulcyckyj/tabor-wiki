import { useEffect } from "react";
import { store } from '../state/store';
import localDB from '../db/db';
import { useSelector } from '@legendapp/state/react';

export const useEntries = () => {
    const entries = useSelector(store.entries);

    useEffect(() => {
      localDB.allDocs({ include_docs: true }).then((result) => {
        store.entries.set(result.rows.map((row) => row.doc!));
      });
    }, []);
  return entries;
};

export default useEntries;
