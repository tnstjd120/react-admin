import { UserSilentRefreshResponse } from "@/types/User";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";
import axios from "axios";
import { API_PATH } from "./API_PATH";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");

    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { PATH, METHOD } = API_PATH.USERS.REFRESH_TOKEN_RETRY;
      const silentResponse = await api(PATH, {
        method: METHOD.method,
        data: {
          userId: getCookie("userId"),
          refreshToken: getCookie("refreshToken"),
        },
      });

      removeCookie("accessToken");
      removeCookie("refreshToken");

      const { accessToken, refreshToken } =
        silentResponse.data as UserSilentRefreshResponse;

      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
