import Container from "react-bootstrap/esm/Container";
import { useTranslation } from "react-i18next";
import { Carousel } from "antd";
import { services } from "../../utils/constants/service";
import { home } from "../../utils/constants/home";
import Partners from "../../components/feature/partners/Partners";
import Services from "../../components/feature/services/Services";
import { IService } from "./types";

import styles from "./home.module.scss";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container className={styles.container}>
      <Carousel
        autoplay={true}
        className={styles.container}>
        {
          home.map((src: string, i: number) => (
            <div key={i}>
              <h3 className={styles.contentStyle}>
                {i === 0 && <div>{t("home.title")}</div>}
                <img
                  src={src}
                  alt={src}
                />
              </h3>
            </div>
          ))
        }
      </Carousel>
      <h1>{t("home.our_services")}</h1>
      <div className={styles.services}>
        {services.map((e: IService, i: number) => <Services key={i} title={t(`home.service.${e.title}`)} src={e.src} />)}
      </div>
      <hr />
      <h1>{t("home.our_partners")}</h1>
      <Partners />
    </Container>
  );
};

export default Home;
