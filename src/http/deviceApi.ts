import { checkAuth } from "../utils/functions";
import { $authHost, $host } from "./index";

export const createType = async (type: any) => {
  const { data } = await $authHost.post("api/type", type);
  checkAuth(data?.status);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand: string) => {
  const { data } = await $authHost.post("api/brand", brand);
  checkAuth(data?.status);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device: any) => {
  const { data } = await $authHost.post("api/device", device);
  checkAuth(data?.status);
  return data;
};

export const updateDevice = async (id: number, device: any) => {
  const { data } = await $authHost.put(`api/device/${id}`, device);
  checkAuth(data?.status);
  return data;
};

export const fetchDevices = async (pagination?: any) => {
  const { data } = pagination?.current
    ? await $host.get(
        `/api/device?page=${pagination?.current}&limit=${pagination?.pageSize}`
      )
    : await $host.get(`/api/device`);
  return data;
};

export const fetchOneDevice = async (id: number) => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};

export const removeOneDevice = async (id: number) => {
  const { data } = await $authHost.delete(`api/device/${id}`);
  checkAuth(data?.status);
  return data;
};

export const fetchOneBasket = async (id: number) => {
  const { data } = await $authHost.get(`api/basket/${id}`);
  checkAuth(data?.status);
  return data;
};

export const createBasket = async (basket: any) => {
  const { data } = await $authHost.post("api/basket", basket);
  checkAuth(data?.status);
  return data;
};

export const removeFromBasket = async (id: number) => {
  const { data } = await $authHost.delete(`api/basket/${id}`);
  checkAuth(data?.status);
  return data;
};

export const createRate = async (rate: any) => {
  const { data } = await $authHost.post("api/rate", rate);
  checkAuth(data?.status);
  return data;
};

export const createOrder = async (order: any) => {
  const { data } = await $authHost.post("api/order", order);
  checkAuth(data?.status);
  return data;
};

export const getOrder = async (pagination?: any) => {
  const { data } = pagination?.current
    ? await $authHost.get(
        `/api/order?page=${pagination?.current}&limit=${pagination?.pageSize}`
      )
    : await $authHost.get(`/api/order`);
  checkAuth(data?.status);
  return data;
};

export const payment = async (payload: any) => {
  const { data } = await $authHost.post(
    "api/stripe/create-checkout-session",
    payload
  );
  checkAuth(data?.status);
  return data;
};
