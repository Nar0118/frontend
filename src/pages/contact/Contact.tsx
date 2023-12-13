import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Form, Input, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CopyOutlined, MailOutlined, PhoneOutlined, ShopOutlined } from "@ant-design/icons";
import Map, { location } from "../../components/feature/map";
import openNotification from "../../components/share/notice";
import SocialMedia from "../../components/feature/socialMedia";
import { contact } from "../../http/userApi";

import styles from './contact.module.scss';

function Contact() {
  const user = useSelector((state: any) => state.user);
  const { t } = useTranslation();

  const onSubmit = async (values: any) => {
    try {
      const res = await contact(values);
      openNotification({
        descriptions: "",
        messages: res?.message,
      });
    } catch (err) {
      openNotification({
        descriptions: t("product.error"),
        messages: t("product.something_went_wrong"),
      });
    }
  }

  const handleCopy = (text: string): Promise<void> => navigator.clipboard.writeText(text);

  const Content = (
    <div>
      <p>Copied!</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <Map />
      <div className={styles.content}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onSubmit}
          className={styles.form}
        >
          <h2>{t("header.contact")}</h2>
          <div className={styles.fullName}>
            <Form.Item
              label={t("form.first_name")}
              required
              rules={[{ required: true, message: "First name is required!" }]}
              name="first_name"
              initialValue={user?.first_name}
            >
              <Input type="" placeholder={t("form.first_name")} />
            </Form.Item>
            <Form.Item
              label={t("form.last_name")}
              required
              rules={[{ required: true, message: "Last name is required!" }]}
              name="last_name"
              initialValue={user?.last_name}
            >
              <Input type="" placeholder={t("form.last_name")} />
            </Form.Item>
          </div>
          <Form.Item
            label={t("form.email")}
            required
            rules={[{ required: true, message: "Email is required!" }]}
            name="email"
            initialValue={user?.email}
          >
            <Input type="email" placeholder={t("form.email")} />
          </Form.Item>
          <Form.Item
            label={t("form.message")}
            required
            rules={[{ required: true, message: "Message is required!" }]}
            name="message"
          >
            <TextArea placeholder={t("form.message")} />
          </Form.Item>
          <Form.Item className={styles.btn}>
            <Button htmlType="submit">{t("product.submit")}</Button>
          </Form.Item>
        </Form>
        <div className={styles.message}>
          <img src="/images/message.avif" alt="message.avif" />
          <div className={styles.socialMedia}>
            <div>
              <p>
                <PhoneOutlined />
                {t('contact.office')}` <a href={`tel:${process.env.REACT_APP_OFFICE}`}>{process.env.REACT_APP_OFFICE}</a>
                <Popover content={Content} title="Click me" trigger="click">
                  <CopyOutlined onClick={() => handleCopy(process.env.REACT_APP_PHONE ?? "")} />
                </Popover>
              </p>
              <p>
                <PhoneOutlined />
                {t('contact.store')}` <a href={`tel:${process.env.REACT_APP_STORE}`}>{process.env.REACT_APP_STORE}</a>
                <Popover content={Content} title="Click me" trigger="click">
                  <CopyOutlined onClick={() => handleCopy(process.env.REACT_APP_STORE ?? "")} />
                </Popover>
              </p>
              <p>
                <PhoneOutlined />
                {t('home.service.powder_coating')}` <a href={`tel:${process.env.REACT_APP_POWDER_COATING}`}>{process.env.REACT_APP_POWDER_COATING}</a>
                <Popover content={Content} title="Click me" trigger="click">
                  <CopyOutlined onClick={() => handleCopy(process.env.REACT_APP_POWDER_COATING ?? "")} />
                </Popover>
              </p>
              <p>
                <ShopOutlined />
                <a href={`https://maps.google.com/?ll=${location.lat},${location.lng}`} target="_blank" rel="noreferrer">
                  {process.env.REACT_APP_ADDRESS}
                </a>
                <Popover content={Content} title="Click me" trigger="click">
                  <CopyOutlined onClick={() => handleCopy(process.env.REACT_APP_ADDRESS ?? "")} />
                </Popover>
              </p>
              <p>
                <MailOutlined /><a href={`mailto:${process.env.REACT_APP_EMAIL}`}>{process.env.REACT_APP_EMAIL}</a>
                <Popover content={Content} title="Click me" trigger="click">
                  <CopyOutlined onClick={() => handleCopy(process.env.REACT_APP_EMAIL ?? "")} />
                </Popover>
              </p>
            </div>
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Contact;
