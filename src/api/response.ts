// import { useUserState } from "@/store/userStore";
// import { api } from "./axios";
// import axios from "axios";
// import { getCookie, setCookie } from "@/utils/cookie";
// import { UserSilentRefreshResponse } from "@/types/User";

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const { user } = useUserState.getState();

//       const silentResponse: UserSilentRefreshResponse = await axios.post(
//         `${import.meta.env.BASE_URL}/api/users/refresh_token`,
//         {
//           data: {
//             userId: user?.userId,
//             refreshToken: getCookie("refreshToken"),
//           },
//         }
//       );

//       const { accessToken, refreshToken } = silentResponse;

//       setCookie("accessToken", accessToken);
//       setCookie("refreshToken", refreshToken);

//       return api(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );
