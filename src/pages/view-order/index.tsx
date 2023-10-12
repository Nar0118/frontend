import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOneOrder } from "../../http/deviceApi";
import { DEVICE_ROUTE } from "../../utils/constants";
import { dateFormat } from "../../utils/functions";

import styles from "./viewOrder.module.scss";

const ViewOrderPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [order, setOrder] = useState<any>();
  const params = useParams() as any;

  const getDevice = useCallback(async () => {
    try {
      const data = await getOneOrder(params["id"]);

      setOrder(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params]);

  useEffect(() => {
    getDevice();
  }, [getDevice]);

  const lookProduct = (id: number) => {
    history.push(`${DEVICE_ROUTE}/${id}`);
  };

  const columnsProduct = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => <Button onClick={() => lookProduct(id)}>See the product</Button>,
    },
    {
      title: t("form.product"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("form.count"),
      dataIndex: "order_device",
      key: "order_device",
      render: (e: any) => `x${e.count}`,
    },
    {
      title: t("form.price"),
      dataIndex: "price",
      key: "price",
    },
  ];

  const columnsPayment = [
    {
      title: t("form.address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("form.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("form.first_name"),
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: t("form.last_name"),
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: t("form.payment_method"),
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: t("form.phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("form.price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("account.status"),
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className={styles.container}>
      <Button
        onClick={() => history.goBack()}
        className={styles.back}
      >
        <ArrowLeftOutlined />
        Go back
      </Button>
      <div className={styles.table}>
        <p>
          Заказ <a href="#">#{params["id"]}</a>{" "}
          &nbsp; был оформлен {dateFormat(order?.createdAt)} и сейчас{" "}
          {order?.status}. Информация о заказе
        </p>
        <Table
          dataSource={(order || [])[0]?.devices}
          columns={columnsProduct}
          rowKey="id"
        />
      </div>
      <div className={styles.table}>
        <p>{t("account.billing_address")}</p>
        <Table
          dataSource={order}
          columns={columnsPayment}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ViewOrderPage;
