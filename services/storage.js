const Data = new Map();

export function setData(user, values) {
  Data.set(user, values);
}

export function getData(user){
  return Data.get(user);
}

