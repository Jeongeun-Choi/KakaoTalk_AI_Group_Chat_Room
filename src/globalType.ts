export type DBColumnType = {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
};

export type DBStoreType = {
  name: string;
  id: IDBObjectStoreParameters;
  columns: DBColumnType[];
};

export type DBConfigType = {
  databaseName: string;
  version: number;
  stores: DBStoreType[];
};
