import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Button, Space, Table as AntTable } from "antd";
import { fetchDevices, removeOneDevice } from "../../../http/deviceApi";
import { DEVICE_ROUTE } from "../../../utils/constants/constants";
import openNotification from "../notice";
import { CreateEditDevice } from "../../modals/CreateEditDevice";
import { IDevice } from "../../deviceItem/types";
import { dateFormat } from "../../../utils/functions";

import styles from './table.module.scss';

const Table = ({ deviceVisible }: any) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [data, setData] = useState<IDevice[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<any>();
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRowProducts, setSelectedRowProducts] = useState<React.Key[]>(
    []
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowProducts([...selectedRowKeys]);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };


  useEffect(() => {
    const fetchData = async (defaultPagination?: any) => {
      try {
        const paginationState = defaultPagination || pagination;
        const response = await fetchDevices(paginationState);

        setData(response);
        setPagination({
          ...paginationState,
          total: response.count,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [deviceVisible, pagination]);

  const handleTableChange = async (pagination: any) => {
    try {
      setPagination(pagination);
      const paginationState = pagination;
      const response = await fetchDevices(paginationState);

      setData(response);
      setPagination({
        ...paginationState,
        total: response.count,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkRating = (device: any): string => {
    if (device?.length) {
      let sum: number = 0;
      device.forEach((i: any) => {
        sum += i.rate;
      });

      return Math.round(sum / Number(device.length)).toString();
    }

    return "0";
  };

  const handleModal = async (device: any, type: string) => {
    setShow(true);
    setModal({ type, device });
  };

  const remove = async () => {
    try {
      if (selectedRowProducts?.length) {
        selectedRowProducts.forEach(async (element: React.Key) => {
          await removeOneDevice(Number(element));
        });
        setData((prev) =>
          prev.filter((item) => !selectedRowProducts.includes(item.id))
        );
        setSelectedRowProducts([]);
      } else {
        await removeOneDevice(modal.device);
        setData((prev) => prev.filter((e) => e.id !== modal.device));
      }

      openNotification({
        descriptions: "Product has been successfully deleted!",
        messages: "Deleted",
      });
      setShow(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("form.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("form.price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("form.image"),
      dataIndex: "img",
      key: "image",
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="User Avatar" className={styles.avatar} />
      ),
    },
    {
      title: t("form.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("product.rating"),
      dataIndex: "ratings",
      key: "ratings",
      render: (value: string) => checkRating(value),
    },
    {
      title: t("account.action"),
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleModal(record, "edit")}>
            {t("account.edit")}
          </Button>
          <Button
            type="dashed"
            onClick={() => handleModal(record.id, "delete")}
          >
            {t("product.remove")}
          </Button>
        </Space>
      ),
    },
    {
      title: t("form.created_date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => <>{dateFormat(date)}</>,
    },
  ];

  return (
    <>
      <Button
        className="mb-3"
        onClick={() => handleModal(1, "delete")}
        disabled={!selectedRowProducts?.length}
      >
        {t("admin.remove_selected_products")}
      </Button>
      {modal?.type === "delete" ? (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {modal?.type === "delete"
                ? t("product.remove_this_product")
                : t("product.edit_this_product")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRowProducts?.length
              ? "Are you sure wanna remove these products?"
              : t("product.are_you_sure")}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={remove}>{t("product.remove")}</Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <CreateEditDevice
          show={show}
          onHide={(res: any) => {
            if (res?.id) {
              const updatedData = data.map((e) => {
                if (e.id === res.id) {
                  e = res;
                }
                return e;
              });

              setData(updatedData);
            }
            setShow(false);
          }}
          selectedDevice={modal?.device}
        />
      )}
      <AntTable
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={data}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
        onRow={(record: any) => ({
          onClick: (e: any) => {
            if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SPAN") {
              history.push(`${DEVICE_ROUTE}/${record.id}`);
            }
          },
        })}
      />
    </>
  );
};

export default Table;
