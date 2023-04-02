import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../storage/io';
export const BASE_URL = "http://localhost:4000/api";

interface RequestConfig extends AxiosRequestConfig {
    headers: {
      Authorization: string;
      'Content-Type': string;
    };
  }

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const addAccessToken = (accessToken: String) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

export const removeAccessToken = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
}

axiosInstance.interceptors.request.use( function (config: RequestConfig) {
  const accessToken = getAccessToken();
  const newConfig = config;
  newConfig.headers.Authorization = `Bearer ${accessToken}`;
  newConfig.headers['Content-type'] = 'application/json';
  return newConfig;
}, function (error) {
  console.log('error in request intercepting', error);
})

axiosInstance.interceptors.response.use(function (response) {
  // do sth with response

}, function (error) {
  const originalRequest = error.config;

  if(error.response.cause === "token") {
    const refreshToken = getRefreshToken();
    if(refreshToken) {
      return axiosInstance.post('/auth/refresh', {
        refreshToken
      })
      .then((data)=> {
        removeAccessToken();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken)
        addAccessToken(data.accessToken);
        return axiosInstance(originalRequest);
      })
    }
  }
})



