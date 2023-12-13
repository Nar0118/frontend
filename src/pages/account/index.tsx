import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Table, TablePaginationConfig, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { LOG_OUT } from "../../store/actionTypes";
import { LOGIN_ROUTE, VIEW_ORDER_ROUTE } from "../../utils/constants/constants";
import { dateFormat } from "../../utils/functions";
import { getOrder } from "../../http/deviceApi";
import { AccountDetails } from "../../components/feature/accountDetails";

import styles from "./account.module.scss";

const Account = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [data, setData] = useState<any>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    if (!user) {
      history.push(LOGIN_ROUTE);
    }
  }, [user, history]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOG_OUT });
    history.push(LOGIN_ROUTE);
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
      case "4":
        logout();
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
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    getOneOrder(pagination);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="left"
      onChange={onChange}
      className={styles.tabs}
    >
      <TabPane tab={t("account.console")} key="1">
        {t("account.console_details", { email: (`${user?.first_name} ${user?.last_name}`) || user?.email })}
      </TabPane>
      <TabPane tab={t("account.orders")} key="2">
        <div className={styles.table}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={pagination}
            rowKey="id"
            onChange={handleTableChange}
          />
        </div>
      </TabPane>
      <TabPane tab={t("account.account_details")} key="3">
        <AccountDetails />
      </TabPane>
      <TabPane
        tab={t("header.log_out")}
        key="4"
        className={styles.logOut}
      ></TabPane>
    </Tabs>
  );
};

export default Account;
