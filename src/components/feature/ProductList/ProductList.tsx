import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { List, Card, Pagination, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { createBasket, fetchBrands, fetchDevices, fetchTypes } from "../../../http/deviceApi";
import {
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
} from "../../../utils/constants";
import openNotification from "../../share/notice";
import { IDevice } from "../../deviceItem/types";

import styles from "./productList.module.scss";

const pageSize = 10;

export const ProductList = () => {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const { t } = useTranslation();
  const [current, setCurrent] = useState<number>(1);
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [search, setSearch] = useState<string>("");
  const [types, setTypes] = useState<any>();
  const [selectedType, setSelectedType] = useState<number>();
  const [brands, setBrands] = useState<any>();
  const [selectedBrand, setSelectedBrand] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsData = await fetchBrands();

        setBrands(brandsData);
      } catch { }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesData = await fetchTypes();

        setTypes(typesData);
      } catch { }
    };

    fetchData();
  }, []);

  const handleType = (id: number) => {
    setSelectedType(id === selectedType ? undefined : id);
  }

  const handleBrand = (id: number) => {
    setSelectedBrand(id === selectedBrand ? undefined : id);
  }

  const getDevices = useCallback(async (signal?: any) => {
    try {
      const res = await fetchDevices({ current, pageSize, search, typeId: selectedType, brandId: selectedBrand }, signal);
      setDevices(res);
    } catch (e) {
      console.error(e);
    }
  }, [current, selectedType, selectedBrand, search]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getDevices(signal)

    return () => { controller.abort(); };
  }, [current, getDevices, search]);

  const handlePageChange = (page: number): void => {
    setCurrent(page);
  };

  const handleAddCart = async (id: number) => {
    try {
      if (!user?.id) {
        return history.push(LOGIN_ROUTE);
      }

      await createBasket({
        deviceId: id,
        userId: user.id,
        quantity: 1,
      });

      openNotification({
        descriptions: t("product.product_has_been_added_to_cart"),
        messages: t("product.added"),
        redirect: BASKET_ROUTE,
      });
    } catch (error) {
      console.error("Error creating basket:", error);
    }
  };

  return (<>
    <Input placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
      prefix={<SearchOutlined />}
      allowClear />
    <div className={styles.container}>
      <div className={styles.bars}>
        <ListGroup className={styles.listGroup}>
          <h2>{t("product.categories")}</h2>
          {types?.map((e: any) => (
            <ListGroup.Item
              active={e.id === selectedType}
              onClick={() => handleType(e.id)}
              key={e.id}
            >
              {e.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup className={styles.listGroup}>
          <h2>{t("product.models")}</h2>
          {brands?.map((e: any) => (
            <ListGroup.Item
              active={e.id === selectedBrand}
              onClick={() => handleBrand(e.id)}
              key={e.id}
            >
              {e.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div>
        <List
          dataSource={devices}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name}>
                <img
                  src={item.img}
                  alt={item.name}
                  onClick={() => history.push(`${DEVICE_ROUTE}/${item.id}`)}
                />
                <p>
                  {t("product.price")}: {`${item.price}${t("product.amd")}`}
                </p>
                <Button
                  variant="outline-dark"
                  onClick={() => handleAddCart(item.id)}
                >
                  {t("product.add_to_cart")}
                </Button>
              </Card>
            </List.Item>
          )}
        />
        <Pagination
          current={current}
          total={devices?.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  </>
  );
};
