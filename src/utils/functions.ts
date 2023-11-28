import jwtDecode from "jwt-decode";
import moment from "moment";
import { LOGIN_ROUTE } from "./constants/constants";

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

export const dateFormat = (originalDateString: string): string => {
  return moment(originalDateString).format("D MMMM, YYYY");
};
