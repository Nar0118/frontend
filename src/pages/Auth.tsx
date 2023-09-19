import { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { registration, login } from "../http/userApi";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
import { LOG_IN } from "../store/actionTypes";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  useEffect(() => {
    if (state.user) {
      history.push(SHOP_ROUTE);
    }
  }, []);

  const click = async () => {
    try {
      if (isLogin) {
        await login(email, password);
        history.push(SHOP_ROUTE);
      } else {
        await registration(email, password);
        history.push(SHOP_ROUTE);
      }
      dispatch({ type: LOG_IN });
      history.push(SHOP_ROUTE);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <Form
        style={{
          maxWidth: "400px",
          margin: "auto",
          marginTop: "100px",
          display: "grid",
          rowGap: "10px",
        }}
      >
        <h1 className="m-auto">{isLogin ? "Login" : "Register"}</h1>
        <Form.Control
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required={true}
        />
        <Form.Control
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required={true}
        />
        <Button onClick={click}>Click</Button>

        {isLogin ? (
          <div className="d-f">
            Don't you have an account?{" "}
            <NavLink to={REGISTRATION_ROUTE}>Click here to register...</NavLink>
          </div>
        ) : (
          <div className="d-f">
            Do you have already an account?{" "}
            <NavLink to={LOGIN_ROUTE}>Click here to login...</NavLink>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Auth;
