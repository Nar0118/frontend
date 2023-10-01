import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";

import styles from "./accountDetails.module.scss";
import uploadStyles from "../../modals/modal.module.scss";
import authStyles from "../../../pages/auth/auth.module.scss";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const AccountDetails = () => {
  const user = useSelector((state: any) => state.user);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [base64String, setBase64String] = useState<string>(user?.avatar || "");

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

  useEffect(() => {
    setBase64String(user?.avatar || "");
  }, [user]);

  const submit = (values: any) => {
    // here should be written details after click
  };

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        <i>Update details</i>
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        className={`${styles.form} ${uploadStyles.container} ${authStyles.container}`}
        onFinish={submit}
      >
        <Form.Item
          label="First name"
          required
          rules={[{ required: true, message: "First name is required!" }]}
          name="firstName"
          initialValue={user?.first_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          required
          rules={[{ required: true, message: "Last name is required!" }]}
          name="lastNname"
          initialValue={user?.last_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          required
          rules={[{ required: true, message: "Email is required!" }]}
          name="email"
          initialValue={user?.email}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          required
          rules={[{ required: true, message: "Phone is required!" }]}
          name="phone"
          initialValue={user?.phone_number}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Address"
          required
          rules={[{ required: true, message: "Address is required!" }]}
          name="address"
          initialValue={user?.address}
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
              disabled={!!base64String || componentDisabled}
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
            <DeleteOutlined
              onClick={() => !componentDisabled && setBase64String("")}
            />
            <img src={base64String} width={100} alt="avatar" />
          </div>
        ) : (
          <></>
        )}
        <hr />
        <h5>Смена пароля</h5>
        <hr />
        <Form.Item
          label="Действующий пароль (не заполняйте, чтобы оставить прежний)"
          name="oldPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Новый пароль (не заполняйте, чтобы оставить прежний)"
          name="newPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Подтвердите новый пароль" name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </>
  );
};
