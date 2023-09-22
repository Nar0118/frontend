import { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button, Space, Table as AntTable } from 'antd';
import { fetchDevices, removeOneDevice } from '../../../http/deviceApi';
import { DEVICE_ROUTE } from '../../../utils/constants';
import openNotification from '../notice';
import { CreateEditDevice } from '../../modals/CreateEditDevice';

const Table = ({ deviceVisible }: any) => {
    const history = useHistory();
    const [data, setData] = useState<any[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [modal, setModal] = useState<any>();
    const [pagination, setPagination] = useState<any>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const fetchData = useCallback(async (defaultPagination?: any) => {
        try {
            const paginationState = defaultPagination || pagination;
            const response = await fetchDevices(paginationState);
            setData(response.rows);
            setPagination({
                ...paginationState,
                total: response.count,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [pagination]);

    useEffect(() => {
        fetchData();
    }, []);


    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setPagination(pagination);
        fetchData(pagination);
    };

    const checkRating = (device: any): string => {
        let sum = 0;
        if (device?.length) {
            device.forEach((i: any) => {
                sum += i.rate;
            });

            return Math.round(sum / Number(device.length)).toString();
        }

        return '0';
    }

    const handleEdit = (device: any) => {
        console.log('device', device);

        setShow(true);
        setModal({ type: 'edit', device });
    }

    const handleDelete = async (id: number) => {
        setShow(true);
        setModal({ type: 'delete', id });
    }

    const remove = async () => {
        try {
            await removeOneDevice(modal.id);
            openNotification({
                descriptions: "Product has been successfully deleted!",
                messages: "Deleted",
            });
            setData((prev) => prev.filter((e: any) => e.id !== modal.id));
            setShow(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'image',
            render: (imageUrl: string) => (
                <img
                    src={imageUrl}
                    alt="User Avatar"
                    style={{ maxWidth: '120px' }}
                />
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Rating',
            dataIndex: 'ratings',
            key: 'ratings',
            render: (value: string) => checkRating(value),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="dashed" onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Created date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'UpdatedAt date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
    ];

    return (
        <>
            {modal?.type === 'delete' ? <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modal === 'delete' ? 'Remove the product' : 'Edit the product'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you wanna remove this product?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={remove}>Remove</Button>
                </Modal.Footer>
            </Modal> :
                <CreateEditDevice
                    show={show}
                    onHide={() => { setShow(false); fetchData() }}
                    selectedDevice={modal?.device}
                />}
            <AntTable
                dataSource={data}
                columns={columns}
                pagination={pagination}
                onChange={handleTableChange}
                rowKey="id"
                onRow={(record: any) => ({
                    onClick: (e: any) => {
                        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SPAN') {
                            history.push(`${DEVICE_ROUTE}/${record.id}`)
                        }
                    },
                })}
            />
        </>
    );
};

export default Table;