import { notification } from 'antd';

import styles from './notification.module.scss';

function getNecessaryStyle(status: any) {
    switch (status) {
        case 'error':
            return styles.error;
        case 'success':
            return styles.success;
        default: return styles.success;
    };
}

export default function openNotification({ status, messages, descriptions, redirect }: any) {
    notification.open({
        message: messages,
        description: descriptions,
        // icon: <Icon name='solicy.svg' width={30} height={38} />,
        className: `${getNecessaryStyle(status)}`,
        onClick: () => {
            if (redirect) window.location.href = redirect;
        }
    });
};
