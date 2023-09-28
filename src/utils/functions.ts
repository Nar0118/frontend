import jwtDecode from "jwt-decode";
import { LOGIN_ROUTE } from "./constants";

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  let user = null;
  if (token) user = jwtDecode(token);
  return user;
};

export const checkAuth = (status: number): void => {
  if (status === 401) {
    localStorage.removeItem("token");
    window.location.href = LOGIN_ROUTE;
  }
};
