import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { LOG_OUT } from '../../store/actionTypes';
import { getAccountItems, LOGIN_ROUTE } from '../../utils/constants';
import { getOrder } from '../../http/deviceApi';

import styles from './account.module.scss';

const Account = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
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
    localStorage.removeItem("token");
    dispatch({ type: LOG_OUT });
    window.location.href = LOGIN_ROUTE;
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
      title: 'Заказ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Итого',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Действия',
      dataIndex: 'action',
      key: 'action',
      render: (imageUrl: string) => (
        <Button>Посмотреть</Button>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
    getOneOrder(pagination);
  };
  return (
    <Tabs defaultActiveKey="1" tabPosition="left" onChange={onChange}>
      <TabPane tab="Консоль" key="1">
        Добро пожаловать, {user?.email}. Из главной страницы аккаунта вы можете посмотреть ваши недавние заказы, настроить платежный адрес и адрес доставки, а также изменить пароль и основную информацию.
      </TabPane>
      <TabPane tab="Заказы" key="2">
        <Table
          dataSource={data}
          columns={columns}
          pagination={pagination}
          rowKey="id"
          onChange={handleTableChange}
        />
      </TabPane>
      <TabPane tab="Детали учетной записи" key="3">
        Детали учетной записи
      </TabPane>
      <TabPane tab="Выйти" key="4">
      </TabPane>
    </Tabs>
  )
}

export default Account;
