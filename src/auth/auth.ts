import { getCookie } from "@/utils/cookie";

export const checkAuth = () => (getCookie("accessToken") ? true : false);
