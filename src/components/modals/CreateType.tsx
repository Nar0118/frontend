import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import { PropsType } from "./type";
import { Form } from "antd";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { createType } from "../../http/deviceApi";

import styles from "./modal.module.scss";

export const CreateType = ({ show, onHide }: PropsType) => {
  const { t } = useTranslation();
  // const [types, setTypes] = useState<any>([]);

  const onFinish = async (values: any) => {
    try {
      await createType(values);
      onHide();
    } catch (error) {
      console.error(error);
    };
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const fetchData = async () => {
      // const typesData = await fetchTypes();

      // setTypes(typesData);
    };

    fetchData();
  }, [show]);

  return (
    <Modal 
    show={show} 
    onHide={onHide} 
    backdrop="static" 
    keyboard={false}
    className={styles.container}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("product.add_type")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="name" required={true}>
            <Input
              name="name"
              placeholder={t("product.enter_type_name")}
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("product.add")}
            </Button>
          </Form.Item>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{t("form.close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
