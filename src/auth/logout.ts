import { removeAllCookies } from "@/utils/cookie";

export const logout = () => {
  removeAllCookies();

  window.location.replace("/login");
};
