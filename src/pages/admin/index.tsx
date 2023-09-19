import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreateBrand } from "../../components/modals/CreateBrand";
import { CreateType } from "../../components/modals/CreateType";
import { CreateEditDevice } from "../../components/modals/CreateEditDevice";
import { SHOP_ROUTE } from "../../utils/constants";
import Table from "../../components/share/table";

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
  }, []);

  return (
    <Container className="d-flex flex-column">
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
        onClick={() => setBrandVisible(true)}
      >
        Add brand
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add device
      </Button>
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
