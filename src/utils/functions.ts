import jwtDecode from "jwt-decode";

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  let user = null;
  if (token) user = jwtDecode(token);
  return user;
};
