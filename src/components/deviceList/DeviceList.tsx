import { useContext } from "react";
import { observer } from "mobx-react-lite";
// import { Context } from "../..";
import { Row, Card } from "react-bootstrap";
import { DeviceItem } from "../deviceItem/DeviceItem";

export const DeviceList = ({devices}: any) => {
  return (
    <Row className="d-flex">
      {devices?.length ?
        devices.map((device: any) => (
          <DeviceItem device={device} key={device.id} />
        )) : <>There is no product...</>}
    </Row>
  );
};
