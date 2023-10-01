import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/constants";
import { IDevice } from "./types";

export const DeviceItem = ({ device }: { device: IDevice }) => {
  const history = useHistory();
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (device?.ratings) {
      const sum: number = device.ratings.reduce(
        (acc, rating) => acc + rating.rate,
        0
      );

      setRating(Math.round(sum / device.ratings.length));
    }
  }, []);

  return (
    <Col md={3} onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image width={150} height={150} src={device?.img} alt={device?.img} />
        <div className="d-flex justify-content-between align-items-center">
          <div>{device.name}</div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div>{rating}</div>
              <Image width={50} height={50} src={"/images/devices/star.jpg"} />
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};
