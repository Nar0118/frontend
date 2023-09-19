import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Form, Input, Button, Radio } from "antd";
import { createOrder, fetchOneBasket } from "../http/deviceApi";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function CheckoutSuccess() {
  const token = localStorage.getItem("token");
  let user: { role?: string; id?: number } = {};
  if (token) user = jwtDecode(token);

  return (
    <>
      Success!
    </>);
}
