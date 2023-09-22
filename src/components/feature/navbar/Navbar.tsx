import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ACCOUNT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, CHECKOUT_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../../utils/constants";
import { LOG_OUT } from "../../../store/actionTypes";

import styles from './navbar.module.scss';

export const Header = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOG_OUT });
    window.location.href = LOGIN_ROUTE;
  };

  const navBar = [
    {
      id: 1,
      title: 'Store',
      auth: true,
      route: SHOP_ROUTE,
    },
    {
      id: 2,
      title: 'Authorization',
      auth: !user,
      route: LOGIN_ROUTE,
    },
    {
      id: 3,
      title: 'Checkout',
      auth: user,
      route: CHECKOUT_ROUTE,
    },
    {
      id: 4,
      title: <ShoppingCartOutlined />,
      auth: user,
      route: BASKET_ROUTE,
    },
    {
      id: 5,
      title: 'Admin',
      auth: user,
      route: ADMIN_ROUTE,
    },
    {
      id: 6,
      title: 'Account',
      auth: user,
      route: ACCOUNT_ROUTE,
    },
    {
      id: 7,
      title: 'Log out',
      auth: user,
      route: SHOP_ROUTE,
    },
  ];

  return (
    <Navbar collapseOnSelect expand="lg" bg="" variant="light">
      <Navbar.Brand href="#home">
        <Nav.Link>
          {/* Here should be logo  */}
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={styles.nav}>
          {
            navBar.map(e =>
              e.auth && <Link
                key={e.id}
                to={e.route}
                onClick={e.title === 'Log out' ? logout : () => { }}>{e.title}</Link>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
