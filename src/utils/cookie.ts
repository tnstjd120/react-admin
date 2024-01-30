import { Cookies } from "react-cookie";

const cookies = new Cookies(``);

const getCookie = (name: string) => {
  return cookies.get(name);
};

const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

export { getCookie, setCookie };
