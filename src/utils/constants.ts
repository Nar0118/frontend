import { IService } from "../pages/home/types";

export const ADMIN_ROUTE = "/admin";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const HOME_ROUTE = "/";
export const SHOP_ROUTE = "/shop";
export const BASKET_ROUTE = "/basket";
export const DEVICE_ROUTE = "/device";
export const CHECKOUT_ROUTE = "/checkout";
export const CHECKOUT_SUCCESS_ROUTE = "/checkout-success";
export const ACCOUNT_ROUTE = "/account";
export const VIEW_ORDER_ROUTE = "/view-order";
export const CONTACT_ROUTE = "/contact";
export const ABOUT_ROUTE = "/about";

export const partners: string[] = [
  "acba.png",
  "evoca.png",
  "flyArna.jpg",
  "uls.jpg",
  "fit24.webp",
  "pesto.jpg",
  "viena.png",
  "vda.jpg",
];

export const services: IService[] = [
  {
    title: "install_electricity",
    src: "umnyy-schyotchik.jpg",
  },
  {
    title: "techological_connection",
    src: "tehprisoedinenie.jpg",
  },
  {
    title: "techological_individual",
    src: "dwLbRyV4AUAtat.jpg",
  },
  {
    title: "production_automation",
    src: "animated.png",
  },
  {
    title: "design",
    src: "projecting540x311.png",
  },
  {
    title: "electric_network",
    src: "pimrs.jpg",
  },
];
