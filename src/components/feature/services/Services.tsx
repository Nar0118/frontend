import { useEffect, useRef, useState } from 'react';
import { IService } from '../../../pages/home/types';

import styles from './services.module.scss';

const Services = ({ title, src }: IService) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string>("630px");

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(`${containerRef.current.offsetWidth}px`);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `url(/images/services/${src})`
      }}
      ref={containerRef}
    >
      <div
        className={styles.bgShadow}
        style={{
          width
        }}
      />
      <div className={styles.context}>
        <div>{title}</div>
      </div>
    </section>
  );
};

export default Services;
