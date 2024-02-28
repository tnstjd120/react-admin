import { Cookies } from "react-cookie";

const cookies = new Cookies();

const getCookie = (name: string) => {
  return cookies.get(name);
};

const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

const removeCookie = (name: string, options?: any) => {
  return cookies.remove(name, { ...options });
};

const removeAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

export { getCookie, setCookie, removeCookie, removeAllCookies };
