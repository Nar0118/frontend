import { ProductList } from "../../components/feature/ProductList/ProductList";

import styles from './shop.module.scss';

const Shop = () => {
  return (
    <div className={styles.container}>
      <ProductList />
    </div>
  );
};

export default Shop;
