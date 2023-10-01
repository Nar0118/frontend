import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOneOrder } from "../../http/deviceApi";
import { ACCOUNT_ROUTE, DEVICE_ROUTE } from "../../utils/constants";
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
      render: (id: number) => (
        <Button onClick={() => lookProduct(id)}>See the product</Button>
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Count",
      dataIndex: "order_device",
      key: "order_device",
      render: (e: any) => `x${e.count}`,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "total",
      dataIndex: "total",
      key: "total",
      render: () => <>{order?.price}</>,
    },
  ];

  const columnsPayment = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "last_name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Payment method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          history.push(ACCOUNT_ROUTE);
        }}
        className={styles.back}
      >
        <ArrowLeftOutlined />
        Go back
      </Button>
      <div className={styles.table}>
        <p>
          Заказ <a href={`${DEVICE_ROUTE}/${params["id"]}`}>#{params["id"]}</a>{" "}
          &nbsp; был оформлен {dateFormat(order?.createdAt)} и сейчас{" "}
          {order?.status}. Информация о заказе
        </p>
        <Table
          dataSource={order?.devices}
          columns={columnsProduct}
          rowKey="id"
        />
      </div>
      {order && (
        <div className={styles.table}>
          <p>Платёжный адрес</p>
          <Table
            dataSource={[order]}
            columns={columnsPayment}
            rowKey="id"
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default ViewOrderPage;
