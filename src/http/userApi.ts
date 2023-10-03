import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (values: any) => {
  const { data } = await $host.post("api/user/register", {
    ...values,
    role: "ADMIN",
  });
  localStorage.setItem("token", data);
  return jwtDecode(data);
};

export const login = async (values: any) => {
  const { data } = await $host.post("api/user/login", values);

  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const update = async (values: any) => {
  const { data } = await $authHost.put(`api/user`, values);

  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
