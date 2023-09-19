import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { List, Card, Pagination } from 'antd';
import { createBasket, fetchDevices } from '../../../http/deviceApi';
import { DEVICE_ROUTE } from '../../../utils/constants';
import openNotification from '../../share/notice';

const pageSize = 10;

export const ProductList = () => {
    const user = useSelector((state: any) => state.user);
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [devices, setDevices] = useState<any[]>([]);

    const getDevices = async () => {
        try {
            const res = await fetchDevices({ current: currentPage, pageSize });
            setTotalItems(res.count)
            setDevices(res.rows);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getDevices();
    }, [currentPage]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleAddCart = async (id: number) => {
        try {
            await createBasket({
                deviceId: id,
                userId: user.id,
                quantity: 1,
            });

            openNotification({
                descriptions: "Product has been added into cart!",
                messages: "Added",
            });
        } catch (error) {
            console.error("Error creating basket:", error);
        }
    };

    return (
        <div>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={devices}
                renderItem={(item) => (
                    <List.Item style={{
                        cursor: 'pointer'
                    }}>
                        <Card title={item.name}>
                            <img src={item.img} alt={item.name} style={{
                                width: '-webkit-fill-available'
                            }} onClick={() => history.push(`${DEVICE_ROUTE}/${item.id}`)} />
                            <p>Price: ${item.price}</p>
                            <Button variant="outline-dark" onClick={() => handleAddCart(item.id)}>
                                Add to cart
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
            />
        </div>
    );
};