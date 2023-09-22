import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { BrandBar } from "../../components/brandBar/BrandBar";
import { ProductList } from "../../components/feature/ProductList/ProductListWithPagination";
import { TypeBar } from "../../components/typeBar/TypeBar";

const Shop = () => {
  return (
    <Container>
      <ProductList />
      <Row className="mt-2">
        <Col md={3} className="mt-1">
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
