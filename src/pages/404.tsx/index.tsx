import { Button, Result } from "antd";
import { SHOP_ROUTE } from "../../utils/constants/constants";

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href={SHOP_ROUTE}>
          Back Home
        </Button>
      }
    />
  );
}
