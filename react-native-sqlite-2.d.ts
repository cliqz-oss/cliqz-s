declare module '@cliqz-oss/react-native-sqlite-2' {
  export interface ITransation {
    executeSql: (
      sql: string,
      params: string[],
      successCb: (tx: any, result: any) => void,
      errorCb: (reason?: any) => void,
    ) => void;
  }

  export interface IDB {
    transaction: (
      fn: (txn: ITransation) => void,
      errorCb?: (reason?: any) => void,
      successCb?: (reason?: any) => void,
    ) => void;
  }

  export default class {
    static openDatabase: (name: string, version: string, description: string, size: number) => IDB;
  }
}
