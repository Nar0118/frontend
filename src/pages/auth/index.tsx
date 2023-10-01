import { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registration, login } from "../../http/userApi";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../../utils/constants";
import { LOG_IN } from "../../store/actionTypes";
import { Button, Form, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import styles from "../../components/feature/accountDetails/accountDetails.module.scss";
import authStyles from "./auth.module.scss";
import uploadStyles from "../../components/modals/modal.module.scss";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Auth = () => {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [base64String, setBase64String] = useState<string>("");

  useEffect(() => {
    const isLogin = location.pathname === LOGIN_ROUTE;
    setIsLogin(isLogin);

    if (state.user) {
      history.push(SHOP_ROUTE);
    }
  }, [history, state, location]);

  const handleFileSelection = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (loadEvent: any) => {
        const base64 = loadEvent.target.result;
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const click = async (values: any) => {
    try {
      if (isLogin) {
        const { email, password } = values;
        await login({ email, password });
        history.push(SHOP_ROUTE);
      } else {
        const val = { ...values, avatar: base64String };
        delete val.confirmPassword;
        await registration(val);
        history.push(SHOP_ROUTE);
      }
      dispatch({ type: LOG_IN });
      history.push(SHOP_ROUTE);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className={`${authStyles.container} ${uploadStyles.container}`}>
      <h1 className="m-auto">{isLogin ? "Login" : "Register"}</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className={`${styles.authForm} ${styles.form}`}
        onFinish={click}
      >
        {isLogin ? (
          <>
            <Form.Item
              label="Email"
              required
              rules={[{ required: true, message: "Email is required!" }]}
              name="email"
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="First name"
              required
              rules={[{ required: true, message: "First name is required!" }]}
              name="first_name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              required
              rules={[{ required: true, message: "Last name is required!" }]}
              name="last_name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              required
              rules={[{ required: true, message: "Email is required!" }]}
              name="email"
              // initialValue={user?.email}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              required
              rules={[{ required: true, message: "Phone is required!" }]}
              name="phone_number"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Address"
              required
              rules={[{ required: true, message: "Address is required!" }]}
              name="address"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              required
              name="avatar"
            >
              <div
                className="form-group"
                style={{
                  width: "100%",
                }}
              >
                <label htmlFor="files" className={uploadStyles.inputContainer}>
                  <img
                    src="https://ik.imagekit.io/2zlgs27bjo/public/icons/uploadFile.svg"
                    alt="uploadFile"
                  />
                  Upload
                </label>
                <input
                  id="files"
                  className={uploadStyles.uploadFileInput}
                  disabled={!!base64String}
                  onChange={handleFileSelection}
                  name="file"
                  type="file"
                  style={{
                    display: "none",
                  }}
                />
              </div>
            </Form.Item>
            {base64String ? (
              <div className={authStyles.imageReview}>
                <div />
                <DeleteOutlined onClick={() => setBase64String("")} />
                <img src={base64String} width={100} alt="avatar" />
              </div>
            ) : (
              <></>
            )}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm the password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Confirm password is required!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

        <div className={`d-f ${styles.haveAccount}`}>
          {`${
            isLogin
              ? "Don't you have an account?"
              : "Do you have already an account?"
          }`}
          &nbsp;
          <NavLink
            to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
          >{`Click here to ${isLogin ? "register" : "login"}...`}</NavLink>
        </div>
        <Form.Item>
          <Button htmlType="submit">{isLogin ? "Login" : "Register"}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
