import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { check, update } from "../../../http/userApi";
import { LOG_IN } from "../../../store/actionTypes";
import openNotification from "../../share/notice";

import styles from "./accountDetails.module.scss";
import uploadStyles from "../../modals/modal.module.scss";
import authStyles from "../../../pages/auth/auth.module.scss";

const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

export const AccountDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { t } = useTranslation();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [base64String, setBase64String] = useState<string>("https://joesch.moe/api/v1/random");

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

  const getUser = async () => {
    try {
      const data: any = await check();

      setBase64String(data?.avatar);
    } catch {

    }
  }

  useLayoutEffect(() => {
    getUser();
  }, []);

  const onSubmit = async (values: any) => {
    try {
      await update({ ...values, avatar: base64String });
      dispatch({ type: LOG_IN });

      openNotification({
        descriptions: "Account details has been successfully updated!",
        messages: t("product.success"),
      });

    } catch (err: any) {
      openNotification({
        descriptions: err.response?.data?.message,
        messages: t("product.error"),
      });
    }
  }
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
          name="first_name"
          initialValue={user?.first_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("form.last_name")}
          required
          rules={[{ required: true, message: "Last name is required!" }]}
          name="last_name"
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
          name="phone_number"
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
            className={`${styles.formGroup} form-group`}>
            <label htmlFor="files" className={uploadStyles.inputContainer}>
              <img
                src="https://ik.imagekit.io/2zlgs27bjo/public/icons/uploadFile.svg"
                alt="uploadFile"
              />
              {t("form.upload_image")}
            </label>
            <input
              id="files"
              className={`${uploadStyles.uploadFileInput} ${styles.uploadFileInput}`}
              disabled={!!base64String || componentDisabled}
              onChange={handleFileSelection}
              name="file"
              type="file"
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
        <Form.Item label={t("account.confirm_new_password")} name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">{t("account.save")}</Button>
        </Form.Item>
      </Form>
    </>
  );
};
