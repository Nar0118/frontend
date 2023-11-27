import { Carousel } from "antd";
import { partners } from "../../../utils/constants";

import styles from './partners.module.scss';

const Partners = () => (
  <Carousel autoplay className={styles.container}>
    {
      partners.map((partner: string, i: number) => (
        <div key={i}>
          <h3 className={styles.contentStyle}>
            <img src={`/images/partners/${partner}`} alt={partner} />
          </h3>
        </div>
      ))
    }
  </Carousel>
);

export default Partners;
