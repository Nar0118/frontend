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
  CHECKOUT_SUCCESS_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  ACCOUNT_ROUTE,
  VIEW_ORDER_ROUTE,
  CONTACT_ROUTE,
  ABOUT_ROUTE,
  HOME_ROUTE,
} from "../utils/constants";
import ViewOrderPage from "../pages/view-order";
import { ContactPage } from "../pages/contact";
import About from "../pages/about";
import Home from "../pages/home";

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
    path: CHECKOUT_SUCCESS_ROUTE,
    Component: CheckoutSuccess,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
  },
  {
    path: `${VIEW_ORDER_ROUTE}/:id`,
    Component: ViewOrderPage,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
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
    path: `${DEVICE_ROUTE}/:id`,
    Component: DevicePage,
  },
  {
    path: CONTACT_ROUTE,
    Component: ContactPage,
  },
  {
    path: ABOUT_ROUTE,
    Component: About,
  },
];
