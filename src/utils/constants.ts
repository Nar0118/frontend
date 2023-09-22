import type { TabsProps } from "antd";

export const ADMIN_ROUTE = "/admin";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const SHOP_ROUTE = "/";
export const BASKET_ROUTE = "/basket";
export const DEVICE_ROUTE = "/device";
export const CHECKOUT_ROUTE = "/checkout";
export const CHECKOUT_SUCCESS_ROUTE = "/checkout-success";
export const ACCOUNT_ROUTE = "/account";

export const getAccountItems = (email: string): TabsProps["items"] => {
  return [
    {
      key: "1",
      label: "Консоль",
      children: `Добро пожаловать, ${email}. Из главной страницы аккаунта вы можете посмотреть ваши недавние заказы, настроить платежный адрес и адрес доставки, а также изменить пароль и основную информацию.`,
    },
    {
      key: "2",
      label: "Заказы",
      children: "Here should be orders",
    },
    {
      key: "3",
      label: "Детали учетной записи",
      children: "Here should be accounts details",
    },
    {
      key: "4",
      label: "Выйти",
      children: "",
    },
  ];
};
