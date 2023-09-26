import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { List, Card, Pagination } from 'antd';
import { createBasket, fetchDevices } from '../../../http/deviceApi';
import { BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE } from '../../../utils/constants';
import openNotification from '../../share/notice';

const pageSize = 10;

export const ProductList = () => {
    const user = useSelector((state: any) => state.user);
    const history = useHistory();
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [devices, setDevices] = useState<any[]>([]);

    const getDevices = useCallback(async () => {
        try {
            const res = await fetchDevices({ current: currentPage, pageSize });
            setTotalItems(res.count)
            setDevices(res.rows);
        } catch (e) {
            console.error(e);
        }
    }, [currentPage])

    useEffect(() => {
        getDevices();
    }, [currentPage, getDevices]);

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
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

    return (
        <div>
            <List
                grid={{ gutter: 16, column: window.innerWidth > 500 ? 3 : 2 }}
                dataSource={devices}
                renderItem={(item) => (
                    <List.Item style={{
                        cursor: 'pointer'
                    }}>
                        <Card title={item.name}>
                            <img src={item.img} alt={item.name} style={{
                                width: '-webkit-fill-available'
                            }} onClick={() => history.push(`${DEVICE_ROUTE}/${item.id}`)} />
                            <p>{t('product.price')}: {item.price} AMD</p>
                            <Button variant="outline-dark" onClick={() => handleAddCart(item.id)}>
                                {t('product.add_to_cart')}
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