import jwtDecode from "jwt-decode";

export default function CheckoutSuccess() {
  const token = localStorage.getItem("token");
  let user: { role?: string; id?: number } = {};
  if (token) user = jwtDecode(token);

  return (
    <>
      Success!
    </>);
}
