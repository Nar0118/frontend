import Container from "react-bootstrap/esm/Container";
import { useTranslation } from "react-i18next";
import { services } from "../../utils/constants";
import Partners from "../../components/feature/partners/Partners";
import Services from "../../components/feature/services/Services";
import { IService } from "./types";

import styles from "./home.module.scss";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container className={styles.container}>
      <div className={styles.home}>
        <div>{t("home.title")}</div>
      </div>
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
