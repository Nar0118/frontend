import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";


function Account() {
  const user = useSelector((state: any) => state.user);

  return (
    <Container className="d-flex flex-column">
      comming soon...
      dear {user.name}
    </Container>
  );
}

export default Account;
