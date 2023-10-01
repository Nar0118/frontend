import { Row } from "react-bootstrap";
import { DeviceItem } from "../deviceItem/DeviceItem";
import { IDevice } from "../deviceItem/types";
import { DeviceListType } from "./types";

export const DeviceList = ({ devices }: DeviceListType) => (
  <Row className="d-flex">
    {devices?.map((device: IDevice) => (
      <DeviceItem device={device} key={device.id} />
    ))}
  </Row>
);
