import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Form, Input, Button, Radio } from "antd";
import { createOrder, fetchOneBasket } from "../../http/deviceApi";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";
import { ACCOUNT_ROUTE, SHOP_ROUTE } from "../../utils/constants";
import openNotification from "../../components/share/notice";

import styles from "./checkout.module.scss";

export default function Checkout() {
  const user = useSelector((state: any) => state.user);
  const { t } = useTranslation();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [deviceIds, setDeviceIds] = useState<any>();
  const history = useHistory();
  const [form] = Form.useForm();
  const paymentMethod = [
    { label: t("form.cash"), value: "cash" },
    { label: t("form.online_payment"), value: "card" },
  ];

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchOneBasket(user.id);

      let total = 0;
      const deviceIds: number[] = [];
      const obj: any = {};
      data?.forEach((datum: any) => {
        total += datum.quantity * datum?.device?.price;
        deviceIds.push(datum.deviceId);
        obj[datum.deviceId] = datum.quantity;
      });

      setDeviceIds(obj);
      setSubtotal(total);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

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
        await createOrder({
          ...values,
          price: subtotal + 2000,
          userId: user.id,
          deviceIds: deviceIds,
          backURL: process.env.REACT_APP_API_URL
        });

        //  ----------------- This was written for stripe payment----------------

        // const res = await payment({
        //   cartItems: {
        //     ...values,
        //     price: subtotal + 2000,
        //     userId: user.id,
        //     subtotal,
        //     deviceIds,
        //   },
        //   userId: user.id,
        // });

        // if (res) {
        // createOrder({ userId: user.id, subtotal, deviceIds });
        // }

        // if (res?.url) {
        //   window.location.href = res.url;
        // }
      }

      openNotification({
        descriptions: "Success!",
        messages: "Order has been successfully created!",
        redirect: ACCOUNT_ROUTE,
      });
      history.push(SHOP_ROUTE);
    } catch {
      openNotification({
        descriptions: t("product.error"),
        messages: t("product.something_went_wrong"),
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
      className={styles.container}
    >
      <Form.Item
        name="firstName"
        label={t("form.first_name")}
        initialValue={user?.first_name}
        required={true}>
        <Input
          name="firstName"
          placeholder={t("form.required_field", {
            field: t("form.first_name"),
          })}
          required={true}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label={t("form.last_name")}
        required={true}
        initialValue={user?.last_name}
      >
        <Input
          name="lastName"
          placeholder={t("form.required_field", { field: t("form.last_name") })}
          required={true}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label={t("form.email")}
        required={true}
        initialValue={user?.email}
      >
        <Input
          name="email"
          placeholder={t("form.required_field", { field: t("form.email") })}
          required={true}
          type={"email"}
        />
      </Form.Item>
      <Form.Item
        name="phone"
        label={t("form.phone")}
        required={true}
        initialValue={user?.phone_number}>
        <Input
          name="phone"
          placeholder={t("form.required_field", { field: t("form.phone") })}
          required={true}
          type={"number"}
        />
      </Form.Item>
      <Form.Item
        name="address"
        label={t("form.address")}
        required={true}
        initialValue={user?.address}>
        <Input
          name="address"
          placeholder={t("form.required_field", { field: t("form.address") })}
          required={true}
        />
      </Form.Item>
      <Form.Item
        name="paymentMethod"
        label={t("form.payment_method")}>
        <Radio.Group options={paymentMethod} />
      </Form.Item>
      <MDBCol>
        <MDBCard className="bg-primary text-white rounded-3">
          <MDBCardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h5" className="mb-0">
                {t("form.card_details")}
              </MDBTypography>
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                fluid
                className={`${styles.MDBCardImage} rounded-3`}
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
              <p className="mb-2">{`${subtotal ? subtotal + 2000 : 0} ${t("product.amd")}`}</p>
            </div>
            <Form.Item>
              <Button type="default" htmlType="submit" disabled={!subtotal}>
                {t("form.pay")}
              </Button>
            </Form.Item>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </Form>
  );
}
