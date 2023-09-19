import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { CreateBrand } from "../components/modals/CreateBrand";
import { CreateType } from "../components/modals/CreateType";
import { CreateDevice } from "../components/modals/CreateDevice";
import { useHistory } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/constants";
import jwtDecode from "jwt-decode";

function Admin() {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token");
  let user: { role?: string; id?: number } = {};
  if (token) user = jwtDecode(token);
  
  useEffect(() => {
    if(user.role !== "ADMIN") {
      history.push(SHOP_ROUTE);
    }
  });

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
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
    </Container>
  );
}

export default Admin;
