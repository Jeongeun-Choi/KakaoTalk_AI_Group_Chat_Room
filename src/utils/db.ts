import { DBConfigType } from "@/globalType";
import { constants } from "@/constants";

const { DB_KEY } = constants;

export function checkValidationTransition(
  db: IDBDatabase,
  storeName: string,
  reject: Function
) {
  if (!db) {
    reject("Please Connect");
  }

  if (!db.objectStoreNames.contains(storeName)) {
    reject(`Store ${storeName} not found`);
  }
}

export function createTransaction(
  db: IDBDatabase,
  mode: IDBTransactionMode,
  storeName: string,
  resolve: any,
  reject?: any
) {
  let transaction = db.transaction(storeName, mode);
  transaction.onerror = reject;
  transaction.oncomplete = resolve;

  return transaction;
}

export async function getConnection(
  config?: DBConfigType
): Promise<IDBDatabase> {
  const dbInstance = typeof window !== undefined ? window.indexedDB : null;
  let _config = config;

  if (!config && dbInstance) {
    _config = window[DB_KEY]?.["config"];
  }

  return new Promise<IDBDatabase>((resolve, reject) => {
    if (dbInstance && _config) {
      const request = dbInstance.open(_config?.databaseName, _config?.version);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e: any) => {
        reject({ message: e.target.error.name });
      };

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;

        config?.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, store.id);
            store.columns.forEach((c) => {
              objectStore.createIndex(c.name, c.keyPath, c.options);
            });
          }
        });
        db.close();
        resolve(db);
      };
    } else {
      reject("Failed to connect");
    }
  });
}

export function getActions<T>(currentStoreName: string) {
  return {
    add(value: T, key?: any) {
      return new Promise((resolve, reject) => {
        getConnection()
          .then((db) => {
            checkValidationTransition(db, currentStoreName, reject);
            let transaction = createTransaction(
              db,
              "readwrite",
              currentStoreName,
              resolve,
              reject
            );
            let objectStore = transaction.objectStore(currentStoreName);
            let request = objectStore.add(value, key);
            request.onsuccess = (e: any) => {
              resolve(e.target.result as T[]);
            };
          })
          .catch(reject);
      });
    },
    update(value: any, key?: string) {
      return new Promise((resolve, reject) => {
        getConnection()
          .then((db) => {
            checkValidationTransition(db, currentStoreName, reject);
            let transaction = createTransaction(
              db,
              "readwrite",
              currentStoreName,
              resolve,
              reject
            );
            let objectStore = transaction.objectStore(currentStoreName);
            let request = objectStore.put(value, key);
            request.onsuccess = (e: any) => {
              resolve(e.target.result as T[]);
            };
          })
          .catch(reject);
      });
    },
    getAll() {
      return new Promise((resolve, reject) => {
        getConnection()
          .then((db) => {
            checkValidationTransition(db, currentStoreName, reject);
            let transaction = createTransaction(
              db,
              "readonly",
              currentStoreName,
              resolve,
              reject
            );
            const objectStore = transaction.objectStore(currentStoreName);
            const request = objectStore.getAll();
            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
          })
          .catch(reject);
      });
    },
    getByID(id: string | number) {
      return new Promise((resolve, reject) => {
        getConnection().then((db) => {
          checkValidationTransition(db, currentStoreName, reject);
          // let transaction = createTransaction
        });
      });
    },
  };
}
