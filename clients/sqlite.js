const Database = require('better-sqlite3');

let db;

export function _getConnection() {
  if (!db) {
    db = new Database('data/userData.db', { verbose: console.log });
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
    result = statement.get(...params);
  } catch(err) {
    console.log(err.message);
  }
  console.log('result ********************');
  console.dir({result}, {depth: 10});
  console.log('***********************');
  return result;
}