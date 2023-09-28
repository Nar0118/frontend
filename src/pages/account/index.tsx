import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Table, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { LOG_OUT } from '../../store/actionTypes';
import { LOGIN_ROUTE } from '../../utils/constants';
import { getOrder } from '../../http/deviceApi';

import styles from './account.module.scss';

const Account = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [data, setDate] = useState<any>();
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    if (!user) {
      history.push(LOGIN_ROUTE);
    }
  }, [user, history])

  const logout = () => {
    history.push(LOGIN_ROUTE);
    dispatch({ type: LOG_OUT });
  };

  const getOneOrder = useCallback(async (defaultPagination?: any) => {
    try {
      const paginationState = defaultPagination || pagination;
      const res = await getOrder(paginationState);
      setDate(res);
      setPagination({
        ...paginationState,
        total: res.count,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [])

  const onChange = (key: string) => {
    switch (key) {
      case '2':
        getOneOrder();
        break;
      case '4':
        logout();
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t("account.order"),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t("account.date"),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t("account.status"),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: t("account.total"),
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: t("account.action"),
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <Button onClick={() => alert(id)}>{t("account.look")}</Button>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
    getOneOrder(pagination);
  };
  return (
    <Tabs defaultActiveKey="1" tabPosition="left" onChange={onChange}>
      <TabPane tab={t("account.console")} key="1">
        {t("account.console_details", { email: user?.email })}
      </TabPane>
      <TabPane tab={t("account.orders")} key="2">
        <Table
          dataSource={data}
          columns={columns}
          pagination={pagination}
          rowKey="id"
          onChange={handleTableChange}
        />
      </TabPane>
      <TabPane tab={t("account.account_details")} key="3">
        {t("account.account_details")}
      </TabPane>
      <TabPane tab={t("header.log_out")} key="4">
      </TabPane>
    </Tabs>
  )
}

export default Account;
