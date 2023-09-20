import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { PropsType } from "./type";
import { Form } from "antd";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { createType, fetchTypes } from "../../http/deviceApi";

export const CreateType = ({ show, onHide }: PropsType) => {
  const [types, setTypes] = useState<any>([]);

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
      const typesData = await fetchTypes();

      setTypes(typesData);
    };

    fetchData();
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new type</Modal.Title>
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
              placeholder="Enter a type name"
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
