import Admin from "../pages/admin";
import Auth from "../pages/auth";
import Basket from "../pages/basket";
import DevicePage from "../pages/product";
import Checkout from "../pages/checkout";
import Shop from "../pages/shop";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Account from "../pages/account";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CHECKOUT_ROUTE,
  CHECKOUT_SUCCESS,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  ACCOUNT,
} from "../utils/constants";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: CHECKOUT_ROUTE,
    Component: Checkout,
  },
  {
    path: CHECKOUT_SUCCESS,
    Component: CheckoutSuccess,
  },
  {
    path: ACCOUNT,
    Component: Account,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
];
