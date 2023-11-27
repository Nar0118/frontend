import { IService } from '../../../pages/home/types';

import styles from './services.module.scss';

const Services = ({ title, src }: IService) => (
  <div
    className={styles.container}
    style={{
      backgroundImage: `url(/images/services/${src})`
    }}>
    <div className={styles.title}>
      {title}
    </div>
  </div>
);

export default Services;
