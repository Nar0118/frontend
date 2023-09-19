import { useEffect, useState } from "react";
import { Col, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "antd/es/button";
import { PropsType } from "./type";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceApi";

export const CreateDevice = ({ show, onHide }: PropsType) => {
  const [brand, setBrand] = useState<string | null>();
  const [type, setType] = useState<string | null>();
  const [brands, setBrands] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [base64String, setBase64String] = useState<string>('');
console.log(4444444444, brand, type);

  useEffect(() => {
    if (!show) {
      setBase64String('');
    }
    const fetchData = async () => {
      const brandsData = await fetchBrands();
      const typesData = await fetchTypes();

      setBrands(brandsData);
      setTypes(typesData);
    };

    fetchData();
  }, [show]);


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const price: string | undefined = event?.target[1]?.value;
    const name: string | undefined = event?.target[0]?.value;
    const description: string | undefined = event?.target[2]?.value;

    if (name && price && brand && type && description) {
      const formData: FormData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brandId", brand);
      formData.append("typeId", type);
      formData.append("img", base64String);
      await createDevice(formData);
      setBase64String('');
      onHide();
    }
  };

  const handleFileSelection = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (loadEvent: any) => {
        const base64 = loadEvent.target.result;
        setBase64String(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleType = (e: string | null) => setType(e);
  const handleBrand = (e: string | null) => setBrand(e);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="d-flex justify-content-between">
          <Dropdown onSelect={handleType}>
            <Dropdown.Toggle>Select a type</Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type: any) => (
                <Dropdown.Item eventKey={type.id} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={handleBrand}>
            <Dropdown.Toggle>{brand || 'Select a brand'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand: any) => (
                <Dropdown.Item eventKey={brand.id} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="form-group">
            <label htmlFor="usr">Name:</label>
            <input required type="text" className="form-control" id="usr" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input required type="number" className="form-control" id="price" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea required className="form-control" id="description" />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload file:</label>
            <input
              required
              type="file"
              className="form-control"
              id="file"
              onChange={handleFileSelection}
            />
          </div>
          <button className="btn btn-outline-success mt-2" type="submit">
            Submit
          </button>
        </form>
        {base64String && (
          <img src={base64String} style={{
            maxWidth: '466px',
          }} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
