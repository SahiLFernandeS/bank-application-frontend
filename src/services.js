import axios from "axios";
import { BASE_URL } from "./Api";

export function postCall(path, payload, header = "") {
  let data = JSON.stringify(payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
    data: data,
  };
  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
