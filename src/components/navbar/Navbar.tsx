import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CHECKOUT_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../../utils/constants";
import { LOG_OUT } from "../../store/actionTypes";

export const Header = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    history.push(LOGIN_ROUTE);
    dispatch({ type: LOG_OUT });
    window.location.href = LOGIN_ROUTE;
  };

  return (
    <header>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to={SHOP_ROUTE}>Store</Link>
        </Menu.Item>
        {!user ? (
          <Menu.Item key="auth">
            <Link to={LOGIN_ROUTE}>Authorization</Link>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="checkout">
              <Link to={CHECKOUT_ROUTE}>Checkout</Link>
            </Menu.Item>
            <Menu.Item key="basket">
              <Link to={BASKET_ROUTE}>
                <ShoppingCartOutlined />
              </Link>
            </Menu.Item>
            {user?.role === "ADMIN" && (
              <Menu.Item key="admin">
                <Link to={ADMIN_ROUTE}>Admin panel</Link>
              </Menu.Item>
            )}
            <Menu.Item key="log_out">
              <Link onClick={logout} to=''>
                Log out
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </header>
  );
};
