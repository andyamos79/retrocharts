import { insertData, getData } from '../clients/sqlite';

export function getUserIdByName(user) {
  const { firstName, lastName } = user;
  const query = `
    SELECT user_id 
    FROM users 
    WHERE 
      first_name = ? 
    AND
      last_name = ?`;

  const result = getData(query, [firstName, lastName]);
  return result ? result.user_id : undefined ;
}

export function insertUserValues(categoryValues) {
  const { firstName, lastName, data } = categoryValues;
  const user = {firstName, lastName };
  let userId = getUserIdByName(user);
  if (!userId) {
    addUserDetails(user);
    userId = getUserIdByName(user);
  }
  
  if (userId) {
    return Object.entries(data).map(async ([key, value]) => {
      const query = `
      INSERT INTO userValues
      (user_id, date, category, value) 
      VALUES
      (?, ?, ?, ?)`;
      
      return insertData(query, [userId, new Date().toDateString(), key, value]);
    });
  } else {
    console.error("UserID not specified");
  }
}

export function addUserDetails(user) {
  const { firstName, lastName } = user;
  const query = `
  INSERT INTO users
    (first_name, last_name) 
  VALUES
    (?, ?)`;
 
  const result = insertData(query, [firstName, lastName]);
  return result;
}

export function getUserDetailsByDate(user, date) {
  const userId = getUserIdByName(user);
  if (!userId) {
    throw Error(`${ user.firstName } ${ user.lastName } does not exist.`);
  }
  const query = `
  SELECT * FROM userValues 
  WHERE 
    user_id = ?
  AND
    date = ?`;

  return getData(query, [userId, date.toDateString()]);
}