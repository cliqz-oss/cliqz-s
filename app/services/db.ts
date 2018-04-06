import reactNativeSqlite2, { IDB, ITransation } from '@cliqz-oss/react-native-sqlite-2';

export default class DB {
  db: IDB;

  constructor() {
    this.db = reactNativeSqlite2.openDatabase('history.db', '1.0', '', 1);
  }

  execTransaction(transaction: (txn: ITransation) => void) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (txn: ITransation) => {
          transaction(txn);
        },
        reject,
        resolve,
      );
    });
  }

  query(sql: string, params = []) {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        txn.executeSql(
          sql,
          params,
          (tx, res) => {
            const len = res.rows.length;
            const response = [];
            for (let i = 0; i < len; i += 1) {
              response.push(res.rows.item(i));
            }
            resolve(response);
          },
          reject,
        );
      });
    });
  }

  command(sql: string, params = []) {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        txn.executeSql(
          sql,
          params,
          (tx, res) => {
            if (res.insertId === -1) {
              const error = new Error(JSON.stringify({
                sql,
                params,
                tx,
                res,
              }));
              reject(error);
              return;
            }
            resolve({
              rowsAffected: res.rowsAffected,
              insertId: res.insertId,
            });
          },
          reject,
        );
      });
    });
  }
}
