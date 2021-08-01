import axios from "axios";
import { config } from "../config";

const backendClient = axios.create({ baseURL: config.backend.baseUrl });

export async function getAllUsersData(dateTime) {
  const datePart = dateTime.substr(0,10);
  const response = await backendClient.get(`/states?date=${datePart}`);
  let returnData;

  if (response.status === 200) {
    returnData = response.data;
  } else {
    console.log("ERROR");
    console.log(JSON.stringify(response));
  }
  return returnData.data;
}

export async function postUserData(data) {
  console.log(data);
  let result = await backendClient.post("/state", data);
  
  if (result.status === 200) {
    result = result.data;
  } else {
    console.log("ERROR");
    console.log(JSON.stringify(result, null, 2));
    result = undefined;
  }
  return data;
}
