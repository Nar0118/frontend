import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, List, Rate, Button } from "antd";
import { Container, Col, Row, Card, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  createBasket,
  createRate,
  fetchOneDevice,
  removeOneDevice,
} from "../../http/deviceApi";
import { StarOutlined } from "@ant-design/icons";
import { BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/constants";
import openNotification from "../../components/share/notice";
import { IDevice } from "../../components/deviceItem/types";

import styles from "./product.module.scss";

const DevicePage = () => {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const { t } = useTranslation();
  const [device, setDevice] = useState<IDevice>();
  const [count, setCount] = useState<number>(1);
  const [rate, setRate] = useState<number>();
  const [rating, setRating] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const params = useParams() as any;

  const getDevice = useCallback(async () => {
    try {
      const data = await fetchOneDevice(params["id"]);
      setDevice(data);

      if (data?.ratings?.length > 0) {
        const sum: number = (data.ratings || []).reduce(
          (acc: number, rating: any) => acc + (rating?.rate || 0),
          0
        );

        setRating(Math.round(sum / data.ratings.length));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params]);

  useEffect(() => {
    getDevice();
  }, [getDevice]);

  const handleAddCart = async () => {
    try {
      if (!user?.id) {
        return history.push(LOGIN_ROUTE);
      }

      await createBasket({
        deviceId: device?.id,
        userId: user?.id,
        quantity: count,
      });

      openNotification({
        descriptions: t("product.product_has_been_added_to_cart"),
        messages: t("product.added"),
        redirect: BASKET_ROUTE,
      });
    } catch (error) {
      console.error("Error creating basket:", error);
    }
  };

  const handleRemoveModal = (param: boolean) => {
    setShow(param);
  };

  const remove = () => {
    removeOneDevice(params["id"]);
    history.push(SHOP_ROUTE);
  };

  const handleCount = (type: string) => {
    switch (type) {
      case "minus":
        count > 1 && setCount(count - 1);
        break;
      case "plus":
        setCount(count + 1);
        break;
      default:
        break;
    }
  };

  const handleRate = (e: number) => {
    setRate(e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createRate({
        userId: user.id,
        deviceId: params["id"],
        rate,
        comment: e.target[0].value,
      });

      getDevice();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className={`d-flex m-3 ${styles.container}`}>
        <Col md={4} className={styles.image}>
          <Image
            width={300}
            // src={process.env.REACT_APP_API_URL + "/uploads/" + device?.img}
            src={device?.img}
            alt={device?.img}
          />
        </Col>
        <Col md={4} className={styles.priceBlock}>
          <Card
            className="d-flex flex-column  justify-content-around p-2"
            style={{ border: "5px FOR" }}
          >
            <h3>{device?.name}</h3>
            <h6>{`${device?.price} ${t("product.amd")}`}</h6>
            <div
              className="d-flex align-items-center column gap-2"
              style={{ flexWrap: "wrap" }}
            >
              <Button onClick={() => handleCount("minus")}>-</Button>
              <h5>{count}</h5>
              <Button onClick={() => handleCount("plus")}>+</Button>
              <button
                onClick={handleAddCart}
                className={`${styles.addCart} ${styles.btn}`}
              >
                {t("product.add_to_cart")}
              </button>
            </div>
          </Card>

          {user?.role === "ADMIN" ? (
            <button
              onClick={() => handleRemoveModal(true)}
              className={`${styles.removeProduct} ${styles.btn}`}
            >
              {t("product.remove")}
            </button>
          ) : (
            <></>
          )}
          <Modal
            show={show}
            onHide={() => handleRemoveModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>{t("product.are_you_sure")}</Modal.Body>
            <Modal.Footer>
              <Button onClick={remove}>{t("product.remove")}</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3 max-width-100">
        <h3 className="m-0 p-0">{t("product.description")}</h3>
        {device?.description}
      </Row>
      <Row className="d-flex flex-column m-3 max-width-100">
        {rating ? (
          <h6>
            {t("product.rating")} (
            <>
              {rating}
              <StarOutlined />
            </>
            )
          </h6>
        ) : (
          <></>
        )}
        <Rate onChange={handleRate} />
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="form-group mt-2">
            <label htmlFor="review">{t("product.review")} *</label>
            <textarea
              required
              cols={20}
              rows={10}
              className={`form-control ${styles.comment}`}
              id="review"
            />
          </div>
          <button className="btn btn-outline-success mt-2" type="submit">
            {t("product.submit")}
          </button>
        </form>
      </Row>
      {device?.ratings?.length ? (
        <List
          itemLayout="horizontal"
          dataSource={device?.ratings}
          renderItem={(item: any, index: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://joesch.moe/api/v1/random?key=${index}`}
                  />
                }
                title={
                  <>
                    <a href="https://ant.design">{item.user.email}</a>
                    <br />
                    <Rate defaultValue={item.rate} disabled={true} />
                  </>
                }
                description={item.comment}
              />
            </List.Item>
          )}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default DevicePage;
