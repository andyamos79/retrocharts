import axios from "axios";
import { config } from "../config";

const backendClient = axios.create({ baseURL: config.backend.baseUrl });

export async function getAllUsersData() {
  return await backendClient
    .get("/state")
    .then((response) => response.data)
    .catch((err) => {
      const error =
        err.response.status === 404
          ? "Resource Not found"
          : "An unexpected error has occurred";
      console.log(error);
    });
}

export async function postUserData(data) {
  return await backendClient
    .post("/state", data)
    .then((response) => response.data)
    .catch((err) => {
      const error =
        err.response.status === 404
          ? "Resource Not found"
          : "An unexpected error has occurred";
      console.log(error);
    });
}
