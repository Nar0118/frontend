import { useLayoutEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreateBrand } from "../../components/modals/CreateBrand";
import { CreateType } from "../../components/modals/CreateType";
import { CreateEditDevice } from "../../components/modals/CreateEditDevice";
import Table from "../../components/share/table";
import { SHOP_ROUTE } from "../../utils/constants";

function Admin() {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  useLayoutEffect(() => {
    if (user.role !== "ADMIN") {
      history.push(SHOP_ROUTE);
    }
  }, [history, user]);

  return (
    <Container className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <Button
          variant="outline-dark"
          className="mt-2"
          onClick={() => setTypeVisible(true)}
        >
          Add type
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2"
          onClick={() => setDeviceVisible(true)}
        >
          Add Product
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2"
          onClick={() => setBrandVisible(true)}
        >
          Add brand
        </Button>
      </div>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateEditDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <hr />
      <div style={{
        overflowX: 'auto',
      }}>
        <Table deviceVisible={deviceVisible} />
      </div>
    </Container>
  );
}

export default Admin;
