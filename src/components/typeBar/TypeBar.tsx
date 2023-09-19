import { useContext } from "react";
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
// import { Context } from "../..";

export const TypeBar = observer(() => {
  // const { user } = useContext(Context);

  return (
    <ListGroup>
      {/* {user._types.length &&
        user._types.map((type: any) => (
          <ListGroup.Item
            active={type.id === user.selectedType.id}
            onClick={() => user.setSelectedType(type)}
            key={type.id}
          >
            {type.name}
          </ListGroup.Item>
        ))} */}
    </ListGroup>
  );
});
