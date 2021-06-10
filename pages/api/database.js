const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

let topics = ["C++", "Python", "Java", "C#", "Go"];

db.run("CREATE TABLE user_values(user process people technology other");

export function insertValues(values) {
  db.run(`INSERT INTO langs(name) VALUES(?)`, ["C"], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}
