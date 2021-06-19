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
  console.log(categoryValues);
  const { firstName, lastName, data } = categoryValues;
  const user = {firstName, lastName };
  return Object.entries(data).map(([key, value]) => {
    const userId = getUserIdByName(user) || addUserDetails(user);
    console.log(userId);
    const query = `
    INSERT INTO userValues
      (user_id, date, category, value) 
    VALUES
      (?, ?, ?, ?)`;

    const result = insertData(query, [userId, new Date().toDateString(), key, value]);
    console.log("INSERTUSERVALUES :" + JSON.stringify(result));
    return result;
  });
}

export function addUserDetails(user) {
  const { firstName, lastName } = user;
  const query = `
  INSERT INTO users
    (first_name, last_name) 
  VALUES
    (?, ?)`;

  const result = insertData(query, [firstName, lastName]);
  console.log("ADDUSER :" + JSON.stringify(result));
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

  const result = getData(query, [userId, date.toDateString()]);
  return result ? result.user_id : undefined ;
}