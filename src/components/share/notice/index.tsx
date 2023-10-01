import { notification } from "antd";
import { IOpenNotificationType } from "./types";

import styles from "./notification.module.scss";

function getNecessaryStyle(status: string | undefined) {
  switch (status) {
    case "error":
      return styles.error;
    case "success":
      return styles.success;
    default:
      return styles.success;
  }
}

export default function openNotification({
  status,
  messages,
  descriptions,
  redirect,
}: IOpenNotificationType) {
  notification.open({
    message: messages,
    description: descriptions,
    // icon: <Icon name='' width={30} height={38} />,
    className: `${getNecessaryStyle(status)}`,
    onClick: () => {
      if (redirect) window.location.href = redirect;
    },
  });
}
