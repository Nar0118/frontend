import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import styles from "./accountDetails.module.scss";
import uploadStyles from "../../modals/modal.module.scss";
import authStyles from "../../../pages/auth/auth.module.scss";
import { update } from "../../../http/userApi";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const AccountDetails = () => {
  const user = useSelector((state: any) => state.user);
  const { t } = useTranslation();
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

  const onSubmit = async (values: any) => {
    const res = await update({ ...values, avatar: base64String });
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
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("form.first_name")}
          required
          rules={[{ required: true, message: "First name is required!" }]}
          name="firstName"
          initialValue={user?.first_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("form.last_name")}
          required
          rules={[{ required: true, message: "Last name is required!" }]}
          name="lastNname"
          initialValue={user?.last_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("form.email")}
          required
          rules={[{ required: true, message: "Email is required!" }]}
          name="email"
          initialValue={user?.email}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label={t("form.phone")}
          required
          rules={[{ required: true, message: "Phone is required!" }]}
          name="phone"
          initialValue={user?.phone_number}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={t("form.address")}
          required
          rules={[{ required: true, message: "Address is required!" }]}
          name="address"
          initialValue={user?.address}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("form.avatar")}
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
              {t("form.upload_image")}
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
        <h5>{t("account.change_password")}</h5>
        <hr />
        <Form.Item
          label={t("account.current_password")}
          name="oldPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("account.new_password")}
          name="newPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Подтвердите новый пароль" name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">{t("account.save")}</Button>
        </Form.Item>
      </Form>
    </>
  );
};
