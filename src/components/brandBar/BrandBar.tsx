import { useContext } from "react";
import { observer } from "mobx-react-lite";
// import { Context } from "../..";
import { Row, Card } from "react-bootstrap";

export const BrandBar = observer(() => {
  // const { user } = useContext(Context);

  return (
    <Row className="d-flex">
      {/* {user._brands.length &&
        user._brands.map((type: any) => (
          <Card
          border={type.id === user.selectedBeand.id ? "danger" : "light"}
          onClick={() => user.setSelectedBrand(type)}
          key={type.id}
            className="p-3"
          >
            {type.name}
          </Card>
        ))} */}
    </Row>
  );
});
