const Database = require('better-sqlite3');
const DEBUG = false;
const DB_OPTIONS = { verbose: console.log };

let db;

export function _getConnection() {
  if (!db) {
    db = new Database('data/userData.db', DEBUG ? DB_OPTIONS : undefined);
  }
  return db;
}

export function insertData(query, params) {
  const dbConnection = _getConnection();
  const insert = dbConnection.prepare(query);
  
  const insertMany = dbConnection.transaction((row) => {
    for (const row of [params]) insert.run(...row);
  });

  try {
     insertMany(params);  
  } catch(err) {
    return console.error(err.message);
  }
  return true;
}

export function getData(query, params) {
  const dbConnection = _getConnection();
  const statement = dbConnection.prepare(query);
  let result;
  try {
    result = statement.all(...params);
  } catch(err) {
    console.log(err.message);
  }
  // console.log(result);
  return result;
}