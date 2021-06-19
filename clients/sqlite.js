const sqlite3 = require("sqlite3").verbose();

let db;

export function _getConnection() {
  if (!db) {
    db = new sqlite3.Database("data/userData.db", (err) => {
      if (err) {
        console.error(err.message);
        throw Error("CANNOT CONNECT TO DATABASE!")
      }
      console.log("SQlite database: Connected");
    });
  }
  return db;
}

export function insertData(query, params) {
  console.log(query);
  const dbConnection = _getConnection();
  return dbConnection.run(query, params, function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with id ${this.lastID}`);
    return this.lastID;
  });
}

export function getData(query, params) {
  console.log(query);
  const dbConnection = _getConnection();
  return dbConnection.get(query, params, function (err, row) {
    if (err) {
      return console.log(err.message);
    }
    return row ? row : undefined;
  });
}