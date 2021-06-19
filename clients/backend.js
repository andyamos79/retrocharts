import axios from "axios";
import { config } from "../config";

const backendClient = axios.create({ baseURL: config.backend.baseUrl });

export async function getAllUsersData() {
  let result = await backendClient.get("/state");

  if (result.status === 200) {
    console.log(JSON.stringify(result));
    result = result.data;
  } else {
    console.log("ERROR");
    console.log(JSON.stringify(result));
    result = undefined;
  }
  return result;
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
