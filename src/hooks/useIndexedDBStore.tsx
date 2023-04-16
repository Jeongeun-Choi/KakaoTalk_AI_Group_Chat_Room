import { useMemo } from "react";
import { constants } from "@/constants";
import { DBConfigType } from "@/globalType";
import { getConnection } from "@/utils/db";

const { DB_KEY } = constants;

function setIndexedDB(config: DBConfigType) {
  return new Promise(async (reslove, reject) => {
    try {
      const res = await getConnection(config);
      console.log("init DB", config);
      window[DB_KEY] = { config };
      reslove(res);
    } catch (e) {
      console.error(e);
      reject();
    }
  });
}

export function useIndexedDBStore<T>(storeName: string) {
  const actions = useMemo(() => {
    return 1;
  }, []);

  return actions;
}

export default setIndexedDB;
