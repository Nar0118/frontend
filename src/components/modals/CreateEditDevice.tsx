import { useEffect, useState } from "react";
import { Col, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import Button from "antd/es/button";
import { Form, Input } from "antd";
import { SHOP_ROUTE } from "../../utils/constants";
import { ActionType, PropsType } from "./type";
import {
  createDevice,
  fetchBrands,
  fetchTypes,
  updateDevice,
} from "../../http/deviceApi";
import openNotification from "../share/notice";

import styles from "./modal.module.scss";
import authStyles from "../../pages/auth/auth.module.scss";

const normFile = (e: any) => Array.isArray(e) ? e : e?.fileList;

export const CreateEditDevice = ({
  show,
  onHide,
  selectedDevice,
}: PropsType) => {
  const { t } = useTranslation();
  const [brand, setBrand] = useState<string>("0");
  const [type, setType] = useState<string>("0");
  const [brands, setBrands] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [base64String, setBase64String] = useState<string>("");
  const [editDevice, setEditDevice] = useState<any>();

  useEffect(() => {
    if (selectedDevice) {
      setEditDevice(selectedDevice);
      setBrand((selectedDevice?.brandId as string) || "0");
      setType((selectedDevice?.typeId as string) || "0");
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (!show) {
      setBase64String("");
      setBrand("0");
      setType("0");
    }

    const fetchData = async () => {
      const brandsData = await fetchBrands();
      const typesData = await fetchTypes();

      setBrands(brandsData);
      setTypes(typesData);
    };

    fetchData();
  }, [show]);

  const handleFileSelection = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (loadEvent: any) => {
        const base64 = loadEvent.target.result;
        setBase64String(base64);
        onChangeEdit("img", base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleType = (e: string | null) => e && setType(e);
  const handleBrand = (e: string | null) => e && setBrand(e);

  const onChangeEdit = (type: ActionType, value: string): void => {
    setEditDevice({ ...editDevice, [type]: value });
  };

  const onSubmit = async (values: any) => {
    try {
      if (type === "0" || brand === "0") {
        return openNotification({
          descriptions: t("product.please_fill_all_field"),
          redirect: SHOP_ROUTE,
          messages: t("product.warning"),
        });
      }

      editDevice?.id
        ? await updateDevice(editDevice.id, { ...values, img: base64String, typeID: type, brandID: brand })
        : await createDevice({ ...values, img: base64String, typeID: type, brandID: brand });

      openNotification({
        descriptions: `Product has been successfully ${editDevice ? t("product.updated") : t("product.created")
          }!`,
        messages: `${editDevice?.id ? t("product.updated") : t("product.created")
          }`,
        redirect: SHOP_ROUTE,
        status: t("product.success"),
      });
    } catch (err: any) {
      openNotification({
        descriptions: err.response?.data?.message,
        messages: t("product.error"),
      });
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className={styles.container}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {editDevice?.id
            ? t("product.edit_this_product")
            : t("product.add_new_product")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="d-flex justify-content-center flex-wrap gap-1">
          <Dropdown onSelect={handleType}>
            <Dropdown.Toggle>
              {(editDevice && types[Number(editDevice?.typeId) - 1]?.name) ||
                (type && types[Number(type) - 1]?.name) ||
                t("product.select_type")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type: any) => (
                <Dropdown.Item eventKey={type.id} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={handleBrand}>
            <Dropdown.Toggle>
              {(editDevice && brands[Number(editDevice?.typeId) - 1]?.name) ||
                (brand && brands[Number(brand) - 1]?.name) ||
                t("product.select_brand")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand: any) => (
                <Dropdown.Item eventKey={brand.id} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className={`${styles.form} ${styles.container} ${authStyles.container} ${styles.createProduct}`}
          onFinish={onSubmit}
          style={{
            marginTop: "30px"
          }}
        >
          <Form.Item
            label={t("form.name")}
            required
            rules={[{ required: true, message: "Name is required!" }]}
            name="name"
            initialValue={editDevice?.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("form.price")}
            required
            rules={[{ required: true, message: "Price is required!" }]}
            name="price"
            initialValue={editDevice?.price}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("form.description")}
            required
            rules={[{ required: true, message: "Description is required!" }]}
            name="description"
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
              <label htmlFor="files" className={styles.inputContainer}>
                <img
                  src="https://ik.imagekit.io/2zlgs27bjo/public/icons/uploadFile.svg"
                  alt="uploadFile"
                />
                {t("form.upload_image")}
              </label>
              <input
                id="files"
                className={styles.uploadFileInput}
                onChange={handleFileSelection}
                name="file"
                type="file"
                style={{
                  display: "none",
                }}
              />
            </div>
          </Form.Item>
          {base64String && (
            <img
              src={base64String || editDevice.img}
              className={styles.imageReview}
              alt='deviceReview'
            />
          )}
          <Form.Item className={styles.btn}>
            <Button htmlType="submit">{t("account.save")}</Button>
          </Form.Item>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
