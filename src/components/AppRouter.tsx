import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { authRoutes, publicRoutes } from "../routes/routes";

function AppRouter() {
  const user = useSelector((state: any) => state.user);

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
