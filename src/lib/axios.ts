import { getToken } from "@/app/(public)/(auth)/utils";
import axios from "axios";
//axios.defaults.baseURL = "http://localhost:5000";
//axios.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;

//const token = await getToken();
const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${await getToken()}`,
  // },
});

httpClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
