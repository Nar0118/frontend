import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Input, Button, Radio } from "antd";
import { createOrder, fetchOneBasket, payment } from "../../http/deviceApi";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";
import { ACCOUNT_ROUTE, SHOP_ROUTE } from "../../utils/constants";
import openNotification from "../../components/share/notice";

export default function Checkout() {
  const user = useSelector((state: any) => state.user);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [deviceIds, setDeviceIds] = useState<number[]>([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const paymentMethod = [
    { label: "Cash", value: "cash" },
    { label: "Online payment", value: "card" },
  ];

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchOneBasket(user.id);

      let total = 0;
      const deviceIds: number[] = [];

      if (data?.length === 0) {
        history.push(SHOP_ROUTE);
      }

      data?.forEach((datum: any) => {
        total += datum.quantity * datum?.device?.price;
        deviceIds.push(datum.deviceId);
      });

      setDeviceIds(deviceIds);

      if (!total) {
        history.push(SHOP_ROUTE);
      }

      setSubtotal(total);
    } catch (error) {
      console.error(error);
    }
  }, [user, history]);

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [fetchData, user]);

  // const getPaymentMethod = (values: any) => {
  //   switch (values.paymentMethod) {
  //     case "cash":
  //       createOrder(values).then((res: any) => console.log(res));
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const onFinish = async (values: any) => {
    try {
      if (values.paymentMethod === "cash") {
        await createOrder({
          ...values,
          price: subtotal,
          userId: user.id,
          deviceIds: deviceIds,
        });

      } else if (subtotal && values.paymentMethod === "card") {
        const res = await payment({
          cartItems: { ...values, price: subtotal + 2000, userId: user.id, subtotal, deviceIds },
          userId: user.id,
        });

        if (res) {
          // createOrder({ userId: user.id, subtotal, deviceIds });
        }

        if (res?.url) {
          window.location.href = res.url;
        }
      }

      openNotification({
        descriptions: 'Success!',
        messages: 'Order has been successfully created!',
        redirect: ACCOUNT_ROUTE,
      });
      history.push(SHOP_ROUTE);
    } catch (error) {
      openNotification({
        descriptions: 'Error!',
        messages: 'Something went wrong!',
      });
    }
  };

  const onFinishFailed = (error: any) => {
    console.log("Failed:", error);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: "700px", margin: "0 auto", textAlign: "end" }}
    >
      <Form.Item name="firstName" label="First name" required={true}>
        <Input
          name="firstName"
          placeholder="Enter a first name"
          required={true}
        />
      </Form.Item>
      <Form.Item name="lastName" label="Last name" required={true}>
        <Input
          name="lastName"
          placeholder="Enter a last name"
          required={true}
        />
      </Form.Item>
      <Form.Item name="email" label="Email" required={true}>
        <Input
          name="email"
          placeholder="Enter a email"
          required={true}
          type={"email"}
        />
      </Form.Item>
      <Form.Item name="phone" label="Phone" required={true}>
        <Input
          name="phone"
          placeholder="Enter a phone"
          required={true}
          type={"number"}
        />
      </Form.Item>
      <Form.Item name="address" label="Address" required={true}>
        <Input name="address" placeholder="Enter a address" required={true} />
      </Form.Item>
      <Form.Item name="paymentMethod" label="Payment method">
        <Radio.Group options={paymentMethod} />
      </Form.Item>
      <MDBCol>
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
              <p className="mb-2">{subtotal ? subtotal + 2000 : 0}AMD</p>
            </div>
            <Form.Item>
              <Button type="default" htmlType="submit" disabled={!subtotal}>
                Pay
              </Button>
            </Form.Item>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </Form>
  );
}
