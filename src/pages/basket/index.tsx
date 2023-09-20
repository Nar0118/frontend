import { fetchOneBasket, removeFromBasket } from "../../http/deviceApi";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { useHistory } from "react-router-dom";
import { CHECKOUT_ROUTE, DEVICE_ROUTE, SHOP_ROUTE } from "../../utils/constants";
import { Button } from "react-bootstrap";
import openNotification from "../../components/share/notice";
import { CloseCircleOutlined } from "@ant-design/icons";

import styles from './basket.module.scss';

export default function Basket() {
  const user = useSelector((state: any) => state.user);
  const [basket, setBasket] = useState<any>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const history = useHistory();

  const fetchData = async () => {
    try {
      const data = await fetchOneBasket(user.id);
      if (data?.length === 0) {
        history.push(SHOP_ROUTE);
      } else {
        setBasket(data);
        let total = 0;
        data.forEach((datum: any) => {
          total += datum.quantity * datum.device.price;
        });
        setSubtotal(total);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);


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

  const removeFromCart = async (id: number) => {
    try {
      await removeFromBasket(id);
      const filteredBasket = basket.filter((e: any) => e.id !== id);
      setBasket(filteredBasket);
      if (!filteredBasket.length) {
        history.push(SHOP_ROUTE);
      }

      openNotification({
        descriptions: filteredBasket.length ? 'Product has been successfully removed!' : 'Your cart is empty!',
        messages: 'Removed',
        status: 'success'
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a href={SHOP_ROUTE} className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {basket?.length} items in your cart
                        </p>
                      </div>
                    </div>
                    {basket?.map((item: any) => (
                      <MDBCard className={`mb-3 ${styles.basketItems}`} key={item.id}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ cursor: "pointer" }}>
                                <MDBCardImage
                                  src={item?.device?.img}
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt="Shopping item"
                                  onClick={() =>
                                    history.push(
                                      DEVICE_ROUTE + "/" + item?.device?.id
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
                              <div style={{ width: "50px" }}>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  {item?.quantity}
                                </MDBTypography>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  {+item?.device?.price * +item?.quantity}AMD
                                </MDBTypography>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <MDBIcon fas icon="trash-alt" />
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                        <div className="d-flex  align-items-center justify-content-center column gap-2 mb-2">
                          <Button
                            variant="outline-dark"
                            onClick={() => handleCount("minus")}
                            style={{
                              padding: '0px 7px'
                            }}
                          >
                            -
                          </Button>
                          <h5 className="mb-0">{item?.quantity}</h5>
                          <Button
                            variant="outline-dark"
                            onClick={() => handleCount("plus")}
                            style={{
                              padding: '0px 7px'
                            }}
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
                            Card details
                          </MDBTypography>
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            fluid
                            className="rounded-3"
                            style={{ width: "45px" }}
                            alt="Avatar"
                          />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">{subtotal}AMD</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">{subtotal ? 2000 : 0}AMD</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">
                            {subtotal ? subtotal + 2000 : 0}AMD
                          </p>
                        </div>
                        <Button
                          variant="outline-light"
                          onClick={() => history.push(CHECKOUT_ROUTE)}
                          disabled={!subtotal}
                        >
                          Checkout
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
