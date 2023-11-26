import Container from "react-bootstrap/esm/Container";
import { useTranslation } from "react-i18next";

import styles from "./home.module.scss";
import Partners from "../../components/feature/partners/Partners";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className={styles.container}>
        <div>{t("home")}</div>
      </div>
      <Partners />
    </Container>
  );
};

export default Home;
