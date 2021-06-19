
CREATE TABLE userValues (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  value INTEGER
);

CREATE TABLE users (
   user_id INTEGER PRIMARY KEY,
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL
);
  
