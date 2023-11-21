import { useCallback, useLayoutEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  CHECKOUT_ROUTE,
  DEVICE_ROUTE,
  SHOP_ROUTE,
} from "../../utils/constants";
import openNotification from "../../components/share/notice";
import {
  fetchOneBasket,
  removeFromBasket,
  updateBasket,
} from "../../http/deviceApi";

import styles from "./basket.module.scss";

export default function Basket() {
  const user = useSelector((state: any) => state.user);
  const { t } = useTranslation();
  const [basket, setBasket] = useState<any>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const history = useHistory();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchOneBasket(user.id);
      if (data?.length === 0) {
      } else {
        setBasket(data);

        if (data?.length) {
          let total = 0;
          data.forEach((datum: any) => {
            total += datum.quantity * datum.device.price;
          });
          setSubtotal(total);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user]);

  useLayoutEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCount = async (type: string, item: any) => {
    const { quantity, id } = item;
    switch (type) {
      case "minus":
        if (quantity === 1) {
          return await removeFromCart(id);
        }
        await updateBasket(id, { quantity: quantity - 1 });
        setBasket((prev: any) =>
          prev.map((e: any) => {
            if (e.id === id) {
              e.quantity = e.quantity - 1;
            }
            return e;
          })
        );
        break;
      case "plus":
        await updateBasket(id, { quantity: quantity + 1 });
        setBasket((prev: any) =>
          prev.map((e: any) => {
            if (e.id === id) {
              e.quantity = e.quantity + 1;
            }
            return e;
          })
        );
        break;
      default:
        break;
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await removeFromBasket(id);
      const filteredBasket = basket?.filter((e: any) => e.id !== id);
      setBasket(filteredBasket);

      openNotification({
        descriptions: filteredBasket.length
          ? "Product has been successfully removed!"
          : "Your cart is empty!",
        messages: "Removed",
        status: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className={`${styles.container} h-100 h-custom`}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <Link to={SHOP_ROUTE} className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" />
                        {t("cart.continue_shopping")}
                      </Link>
                    </MDBTypography>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">{t("cart.shopping_cart")}</p>
                        <p className="mb-0">
                          {t("cart.cart_count", { count: basket?.length })}
                        </p>
                      </div>
                    </div>
                    {basket?.map((item: any) => (
                      <MDBCard
                        className={`mb-3 ${styles.basketItems}`}
                        key={item.id}
                      >
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div className={styles.MDBCardImageBlock}>
                                <MDBCardImage
                                  src={item?.device?.img}
                                  fluid
                                  className={` ${styles.MDBCardImage} rounded-3`}
                                  alt="Shopping item"
                                  onClick={() =>
                                    history.push(
                                      `${DEVICE_ROUTE}/${item?.device?.id}`
                                    )
                                  }
                                />
                              </div>
                              <div className="ms-3">
                                <MDBTypography tag="h5">
                                  {item?.device?.name}
                                </MDBTypography>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div className={styles.quantity}>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  {item?.quantity}
                                </MDBTypography>
                              </div>
                              <div className={styles.totalQuantity}>
                                <MDBTypography tag="h5" className="mb-0">
                                  {`${Number(item?.device?.price) * Number(item?.quantity)} ${t("product.amd")}`}
                                </MDBTypography>
                              </div>
                              <a href="#">
                                <MDBIcon fas icon="trash-alt" />
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                        <div className="d-flex align-items-center justify-content-center column gap-2 mb-2">
                          <Button
                            variant="outline-dark"
                            onClick={() => handleCount("minus", item)}
                            className={styles.plusMinus}
                          >
                            -
                          </Button>
                          <h5 className="mb-0">{item?.quantity}</h5>
                          <Button
                            variant="outline-dark"
                            onClick={() => handleCount("plus", item)}
                            className={styles.plusMinus}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="outline-danger"
                          onClick={() => removeFromCart(item.id)}
                          disabled={!subtotal}
                          className={styles.remove}
                        >
                          <CloseCircleOutlined />
                        </Button>
                      </MDBCard>
                    ))}
                  </MDBCol>
                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            {t("form.card_details")}
                          </MDBTypography>
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            fluid
                            className={`${styles.MDBCardBody} rounded-3`}
                            alt="Avatar"
                          />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">{t("form.subtotal")}</p>
                          <p className="mb-2">{`${subtotal} ${t("product.amd")}`}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">{t("form.shipping")}</p>
                          <p className="mb-2">{`${subtotal ? 2000 : 0} ${t("product.amd")}`}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">{t("form.Total_incl_taxes")}</p>
                          <p className="mb-2">
                            {`${subtotal ? subtotal + 2000 : 0} ${t("product.amd")}`}
                          </p>
                        </div>
                        <Button
                          variant="outline-light"
                          onClick={() => history.push(CHECKOUT_ROUTE)}
                          disabled={!subtotal}
                        >
                          {t("header.checkout")}
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </Button>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
