import { useCallback, useLayoutEffect, useState } from "react";
import { Button, Container, Dropdown, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TablePaginationConfig, Tabs, Table as AntTable } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { CreateBrand } from "../../components/modals/CreateBrand";
import { CreateType } from "../../components/modals/CreateType";
import { CreateEditDevice } from "../../components/modals/CreateEditDevice";
import Table from "../../components/share/table";
import openNotification from "../../components/share/notice";
import { SHOP_ROUTE, VIEW_ORDER_ROUTE } from "../../utils/constants/constants";
import { dateFormat } from "../../utils/functions";
import { StatusEnum } from "../../utils/enum";
import { changeStatusOrder, getOrder } from "../../http/deviceApi";

import styles from './admin.module.scss';

function Admin() {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const { t } = useTranslation();
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [data, setData] = useState<any>();
  const [show, setShow] = useState<any>();
  const [status, setStatus] = useState<StatusEnum>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useLayoutEffect(() => {
    if (user.role !== "ADMIN") {
      history.push(SHOP_ROUTE);
    }
  }, [history, user]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    getOneOrder(pagination);
  };

  const getOneOrder = useCallback(
    async (defaultPagination?: TablePaginationConfig) => {
      try {
        const paginationState = defaultPagination || pagination;
        const res = await getOrder(paginationState);
        setData(res);
        setPagination({
          ...paginationState,
          total: res.count,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [pagination]
  );

  const onChange = (key: string) => {
    switch (key) {
      case "2":
        getOneOrder();
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("account.order"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("account.date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <>{dateFormat(date)}</>,
    },
    {
      title: t("account.status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("account.total"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("account.action"),
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Button
          onClick={() => {
            history.push(`${VIEW_ORDER_ROUTE}/${id}`);
          }}
        >
          {t("account.look")}
        </Button>
      ),
    },
    {
      title: t("account.edit"),
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <Button onClick={() => setShow(data?.find((e: any) => e.id === id))}>
          {t("account.edit")}
        </Button>
      ),
    },
  ];

  const handleStatus = (e: string | null) => e && setStatus(e as StatusEnum);

  const onSubmit = async () => {
    try {
      if (show?.id && status) {
        await changeStatusOrder(show.id, status);

        const updatedData = data.map((e: any) => {
          if (e.id === show.id) {
            e.status = status;
          }

          return e;
        });

        setData(updatedData);
        openNotification({
          descriptions: "Updated",
          messages: t("status.status_updated"),
        });
      }
      setShow(null);
    } catch { }
  }

  return (
    <Container className="d-flex flex-column">
      <div className={`d-flex justify-content-between flex-wrap ${styles.container}`}>
        <Button
          variant="outline-dark"
          className="mt-2"
          onClick={() => setTypeVisible(true)}
        >
          {t("product.add_type")}
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2"
          onClick={() => setDeviceVisible(true)}
        >
          {t("product.add_product")}
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2"
          onClick={() => setBrandVisible(true)}
        >
          {t("product.add_brand")}
        </Button>
      </div>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateEditDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <hr />
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        onChange={onChange}
        className={styles.tabs}
      >
        <TabPane tab={t("admin.products")} key="1">
          <div className={styles.table}>
            <Table deviceVisible={deviceVisible} />
          </div>
        </TabPane>
        <TabPane tab={t("account.orders")} key="2">
          <div className={styles.table}>
            <AntTable
              dataSource={data}
              columns={columns}
              pagination={pagination}
              rowKey="id"
              onChange={handleTableChange}
            />
          </div>
        </TabPane>
      </Tabs>
      <Modal
        show={!!show}
        onHide={() => setShow(null)}
        backdrop="static"
        keyboard={false}
        className={styles.container}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("account.status")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown onSelect={handleStatus}>
            <Dropdown.Toggle>
              {status || t(`status.${(show?.status || StatusEnum.PENDING).replace(" ", "_")}`)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                Object.values(StatusEnum).map((e) =>
                  <Dropdown.Item eventKey={e} key={e}>
                    {t(`status.${e.replace(" ", "_")}`)}
                  </Dropdown.Item>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit}>{t("account.save")}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
