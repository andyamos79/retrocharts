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
  return (result && result.length) ? result[0].user_id : undefined ;
}

export function insertUserValues(categoryValues) {
  const { firstName, lastName, data } = categoryValues;
  const user = {firstName, lastName };

  console.log(`Adding data for ${_formatUser(user)}`);
  let userId = getUserIdByName(user);
  console.log(`User: ${userId}`);

  if (!userId) {
    console.log("User does not exist - adding user");
    userId = addUserDetails(user);
  }

  if (userId) {
    const datePart = new Date().toISOString().substr(0, 10);
    const query = `
    REPLACE INTO userValues
    (user_id, date, category, value) 
    VALUES
    (?, ?, ?, ?)`;
    const dataToReturn = Object.entries(data).map(async ([key, value]) => {
      return insertData(query, [userId, datePart, key, value]);
    });
  } else {
    console.error("UserID not specified");
  }
}

export function addUserDetails(user) {
  console.log(`Add user: '${_formatUser(user)}'`);
  const { firstName, lastName } = user;
  if (!firstName) return;

  const query = `
  INSERT INTO users
    (first_name, last_name) 
  VALUES
    (?, ?)`;
 
  if (insertData(query, [firstName, lastName])) {
    return getUserIdByName(user);
  }
}

const _formatUser = (user) => `${user.firstName} ${user.lastName}`;

export function getUserDetailsByDate(user, date) {
  console.log(`Getting data for ${_formatUser(user)} on ${date}`);
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

  return getData(query, [userId, date]);
}

export async function getAllUserDetailsByDate(date) {
  console.log(`Getting data for all users for: ${date}`);
  const query = `
  SELECT * FROM userValues 
  WHERE date = ?`;

  return await getData(query, [date]);
}