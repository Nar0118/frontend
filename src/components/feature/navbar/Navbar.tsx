import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  ACCOUNT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CHECKOUT_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../../../utils/constants";
import { LOG_OUT } from "../../../store/actionTypes";

import styles from "./navbar.module.scss";

const languages: { [key: string]: string } = {
  en: "US",
  am: "AM",
  ru: "RU",
};

export const Header = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(languages[i18n.language]);

  useEffect(() => {
    setLang(languages[i18n.language]);
  }, [i18n]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOG_OUT });
    window.location.href = LOGIN_ROUTE;
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
        />
      ),
    },
  ];

  const navBar = [
    {
      id: 2,
      title: "authorization",
      visible: !user,
      route: LOGIN_ROUTE,
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
      title: (
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
      ),
      visible: user,
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
        <Nav.Link href={SHOP_ROUTE}>
          <img
            src="https://bebest.am/wp-content/uploads/2020/03/cropped-systems-1.jpg"
            alt="logo"
          />
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={styles.nav}>
          <div>
            {navBar.map((e) =>
              !e.visible ? (
                <></>
              ) : e.route ? (
                <Link key={e.id} to={e.route}>
                  {typeof e.title === "string"
                    ? t(`main.header.${e.title}`)
                    : e.title}
                </Link>
              ) : (
                <div key={e.id}>{e.title}</div>
              )
            )}
          </div>
          <Link to={LOGIN_ROUTE} onClick={logout}>
            {t("main.header.log_out")} <LogoutOutlined />
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
