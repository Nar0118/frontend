import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import {
  ABOUT_ROUTE,
  ACCOUNT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CHECKOUT_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../../../utils/constants";
import { LOG_OUT } from "../../../store/actionTypes";

import styles from "./navbar.module.scss";

const languages: { [key: string]: string } = {
  en: "US",
  am: "AM",
  ru: "RU",
  "en-US": "US",
};

export const Header = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [lang, setLang] = useState<string>(languages[i18n.language]);

  useEffect(() => {
    setLang(languages[i18n.language]);
  }, [i18n]);

  const logout = () => {
    history.push(LOGIN_ROUTE);
    localStorage.removeItem("token");
    dispatch({ type: LOG_OUT });
  };

  const handleLanguage = (key: string): void => {
    i18n.changeLanguage(key);
    setLang(languages[key]);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <img
          src="https://purecatamphetamine.github.io/country-flag-icons/3x2/AM.svg"
          onClick={() => {
            handleLanguage("am");
          }}
          alt="lang"
        />
      ),
    },
    {
      key: "2",
      label: (
        <img
          src="https://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg"
          onClick={() => {
            handleLanguage("ru");
          }}
          alt="lang"
        />
      ),
    },
    {
      key: "3",
      label: (
        <img
          src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
          onClick={() => {
            handleLanguage("en");
          }}
          alt="lang"
        />
      ),
    },
  ];

  const navBar = [
    {
      id: 0,
      title: "home",
      visible: true,
      route: HOME_ROUTE,
    },
    {
      id: 1,
      title: "shop",
      visible: true,
      route: SHOP_ROUTE,
    },
    {
      id: 2,
      title: "about",
      visible: true,
      route: ABOUT_ROUTE,
    },
    {
      id: 3,
      title: "checkout",
      visible: user,
      route: CHECKOUT_ROUTE,
    },
    {
      id: 4,
      title: <ShoppingCartOutlined />,
      visible: user,
      route: BASKET_ROUTE,
    },
    {
      id: 5,
      title: "admin",
      visible: user?.role === "ADMIN",
      route: ADMIN_ROUTE,
    },
    {
      id: 6,
      title: <UserOutlined />,
      visible: user,
      route: ACCOUNT_ROUTE,
    },
    {
      id: 7,
      title: 'contact',
      visible: true,
      route: CONTACT_ROUTE,
    },
    {
      id: 8,
      title: "authorization",
      visible: !user,
      route: LOGIN_ROUTE,
    },
  ];

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg=""
      variant="light"
      className={styles.navbar}
    >
      <Navbar.Brand>
        <Link to={HOME_ROUTE}>
          <img
            className={styles.logo}
            src="/images/logo.jfif"
            alt="logo"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={`${styles.nav} ${!user && styles.navLogin}`}>
          <div>
            {navBar.map(
              (e) =>
                e.visible && (
                  <Link key={e.id} to={e.route}>
                    {typeof e.title === "string"
                      ? t(`header.${e.title}`)
                      : e.title}
                  </Link>
                )
            )}
            <div>
              <Dropdown
                menu={{ items }}
                placement="bottomLeft"
                arrow={{ pointAtCenter: true }}
              >
                <Button>
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${lang}.svg`}
                    alt="Flag"
                    width="24"
                    height="16"
                  />
                </Button>
              </Dropdown>
            </div>
          </div>
          {user && (
            <Link to={LOGIN_ROUTE} onClick={logout}>
              {t("header.log_out")} <LogoutOutlined />
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
