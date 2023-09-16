import axios from "axios";
import { store } from "../store/index";
import { authActions } from "../store/authenticationSlice";

class HttpClient {
  axiosInstance;
  constructor() {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 5000,
    });

    instance.interceptors.request.use(
      async (config) => {
        const { access: accessToken } = store.getState().authentication.tokens;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken.token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { refresh: refreshToken } =
          store.getState().authentication.tokens;
        console.log(refreshToken);
        const refreshTokenURL = "/auth/refresh-token";
        const originalRequest = error.config;

        if (
          originalRequest?.url !== refreshTokenURL &&
          error.response?.status === 401 &&
          error.response?.statusText === "Unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          // Call your refresh token API here to get a new access token
          const newAccessToken = await instance.post(refreshTokenURL, {
            refreshToken,
          });

          // Save the new access token to local storage
          const data = newAccessToken?.data?.data;

          const { access, refresh } = data;

          store.dispatch(
            authActions.setToken({ accessToken: access, refreshToken: refresh })
          );

          // Add the new access token to the request headers
          instance.defaults.headers.common.Authorization = `Bearer ${access.token}`;

          // Retry the original request with the new access token
          return instance(originalRequest);
        } else if (
          originalRequest?.url === refreshTokenURL &&
          error.response?.status === 401
        ) {
          // when really expire, redirect to login
          store.dispatch(
            authActions.setToken({ accessToken: {}, refreshToken: {} })
          );
          window.location.pathname = "/login";
        }

        return Promise.reject(error);
      }
    );

    this.axiosInstance = instance;
  }
}

export class ServiceBase extends HttpClient {
  get = this.axiosInstance.get;
  put = this.axiosInstance.put;
  patch = this.axiosInstance.patch;
  post = this.axiosInstance.post;
  delete = this.axiosInstance.delete;
}
