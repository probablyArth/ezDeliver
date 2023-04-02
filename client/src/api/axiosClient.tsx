import axios, { AxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../storage/io";
export const BASE_URL = "http://localhost:4000/api";

interface RequestConfig extends AxiosRequestConfig {
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const addAccessToken = (accessToken: String) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const removeAccessToken = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = getAccessToken();
    const newConfig = config;
    newConfig.headers.Authorization = `Bearer ${accessToken}`;
    newConfig.headers["Content-type"] = "application/json";
    return newConfig;
  },
  (error) => {
    console.log("error in request intercepting", error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // do sth with response
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.cause === "access_token") {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        return axiosInstance
          .post("/auth/refresh", {
            refreshToken,
          })
          .then(
            ({
              data,
            }: {
              data: {
                accessToken: string;
                refreshToken: string;
              };
            }) => {
              removeAccessToken();
              setAccessToken(data.accessToken);
              setRefreshToken(data.refreshToken);
              addAccessToken(data.accessToken);
              return axiosInstance(originalRequest);
            }
          );
      }
    }
  }
);

export default axiosInstance;
