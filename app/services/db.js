import SQLite from 'react-native-sqlite-2';

export default class DB {
  constructor() {
    this.db = SQLite.openDatabase('history.db', '1.0', '', 1);
  }

  execTransaction(transaction) {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        transaction(txn);
      }, reject, resolve);
    });
  }

  query(sql, params = []) {
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

  command(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn) => {
        txn.executeSql(
          sql,
          params,
          (tx, res) => {
            if (res.insertId === -1) {
              reject(new Error({
                sql,
                params,
                tx,
                res,
              }));
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
