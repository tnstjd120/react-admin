import { removeCookie } from "@/utils/cookie";

export const logout = () => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeCookie("userId");

  window.location.replace("/login");
};
