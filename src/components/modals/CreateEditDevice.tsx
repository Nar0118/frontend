import { useEffect, useState } from "react";
import { Col, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import Button from "antd/es/button";
import { SHOP_ROUTE } from "../../utils/constants";
import { PropsType } from "./type";
import { createDevice, fetchBrands, fetchTypes, updateDevice } from "../../http/deviceApi";
import openNotification from "../share/notice";

import styles from './modal.module.scss';

export const CreateEditDevice = ({ show, onHide, selectedDevice }: PropsType) => {
  const { t } = useTranslation();
  const [brand, setBrand] = useState<string>(selectedDevice?.brandId || '0');
  const [type, setType] = useState<string>(selectedDevice?.typeId || '0');
  const [brands, setBrands] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [base64String, setBase64String] = useState<string>('');
  const [editDevice, setEditDevice] = useState<any>(selectedDevice);

  useEffect(() => {
    setEditDevice(selectedDevice);
    setBrand(selectedDevice?.brandId || '0');
    setType(selectedDevice?.typeId || '0');
  }, [selectedDevice]);

  useEffect(() => {
    if (!show) {
      setBase64String('');
      setBrand('0');
      setType('0');
    }

    const fetchData = async () => {
      const brandsData = await fetchBrands();
      const typesData = await fetchTypes();

      setBrands(brandsData);
      setTypes(typesData);
    };

    fetchData();
  }, [show]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const price: string | undefined = event?.target[1]?.value;
    const name: string | undefined = event?.target[0]?.value;
    const description: string | undefined = event?.target[2]?.value;

    if (name && price && brand !== '0' && type !== '0' && description) {
      const formData: FormData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brandId", brand);
      formData.append("typeId", type);
      formData.append("img", base64String || editDevice?.img);

      try {
        editDevice?.id ? await updateDevice(editDevice.id, formData) : await createDevice(formData);
        setBase64String('');
        onHide();

        openNotification({
          descriptions: `Product has been successfully ${editDevice ? t('product.updated') : t('product.created')}!`,
          messages: `${editDevice?.id ? t('product.updated') : t('product.created')}`,
          redirect: SHOP_ROUTE,
          status: t('product.success')
        });
      } catch (error) {
        openNotification({
          descriptions: t("product.something_went_wrong"),
          messages: t("product.error"),
        });
      }
    } else {
      openNotification({
        descriptions: t("product.please_fill_all_field"),
        redirect: SHOP_ROUTE,
        messages: t("product.warning"),
      });
    }
  };

  const handleFileSelection = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (loadEvent: any) => {
        const base64 = loadEvent.target.result;
        setBase64String(base64);
        onChangeEdit('img', base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleType = (e: string | null) => e && setType(e);
  const handleBrand = (e: string | null) => e && setBrand(e);

  const onChangeEdit = (type: string, value: string): void => {
    setEditDevice({ ...editDevice, [type]: value });
  }

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} className={styles.container}>
      <Modal.Header closeButton>
        <Modal.Title>{editDevice?.id ? t("product.edit_this_product") : t("product.add_new_product")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="d-flex justify-content-between">
          <Dropdown onSelect={handleType}>
            <Dropdown.Toggle>{(editDevice && types[Number(editDevice?.typeId) - 1]?.name) || (type && types[Number(type) - 1]?.name) || t("product.select_type")}</Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type: any) => (
                <Dropdown.Item eventKey={type.id} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={handleBrand}>
            <Dropdown.Toggle>{(editDevice && brands[Number(editDevice?.typeId) - 1]?.name) || (brand && brands[Number(brand) - 1]?.name) || t("product.select_brand")}</Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand: any) => (
                <Dropdown.Item eventKey={brand.id} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="form-group">
            <label htmlFor="usr">{t("form.name")}:</label>
            <input required type="text" className="form-control" id="usr" value={editDevice?.name}
              onChange={(e) => {
                if (editDevice) {
                  onChangeEdit('name', e.target.value);
                }
              }} />
          </div>
          <div className="form-group">
            <label htmlFor="price">{t("form.price")}:</label>
            <input required type="number" className="form-control" id="price" value={editDevice?.price}
              onChange={(e) => {
                if (editDevice) {
                  onChangeEdit('price', e.target.value);
                }
              }} />
          </div>
          <div className="form-group">
            <label htmlFor="description">{t("form.description")}:</label>
            <textarea required className="form-control" id="description" value={editDevice?.description} onChange={(e) => {
              if (editDevice) {
                onChangeEdit('description', e.target.value);
              }
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="files" className={styles.inputContainer}>
              <img src="https://ik.imagekit.io/2zlgs27bjo/public/icons/uploadFile.svg" alt="uploadFile" />
              {t("form.upload_image")}
            </label>
            <input
              id="files"
              className={styles.uploadFileInput}
              required={!editDevice || !!base64String}
              onChange={handleFileSelection}
              name="file"
              type="file" />
          </div>
          <button className="btn btn-outline-success mt-2" type="submit">
            {t("product.submit")}
          </button>
        </form>
        {(base64String && !editDevice) && (
          <img src={base64String} style={{
            maxWidth: '466px',
            marginTop: '20px',
          }} alt={base64String} />
        )}
        {editDevice && (
          <img src={editDevice.img} style={{
            maxWidth: '466px',
            marginTop: '20px',
          }} alt={editDevice.img} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{t("form.close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
