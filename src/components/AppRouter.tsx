import jwtDecode from "jwt-decode";
import { useContext } from "react";
// import { Context } from "..";
import { Switch, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes/routes";

function AppRouter() {
  const token = localStorage.getItem("token");
  let user: { role?: string } = {};
  if (token) user = jwtDecode(token);

  return (
    <Switch>
      {user &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
    </Switch>
  );
}

export default AppRouter;
