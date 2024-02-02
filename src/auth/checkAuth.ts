import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { UserInfoResponse } from "@/types/User";

export const checkAuth = async () => {
  const { PATH, METHOD } = API_PATH.USERS.USER_INFO_GET;

  try {
    const response = await api(PATH, METHOD);
    return {
      isAuth: true,
      userInfo: response.data as UserInfoResponse,
    };
  } catch (error) {
    console.log(error);
    return { isAuth: false, userInfo: null };
  }
};
