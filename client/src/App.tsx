import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useGlobalStyles } from "globalStyles";
import Spinner from "components/global/Spinner";

// Lazy loaded pages
const Join = lazy(() => import("pages/Join"));
const Chat = lazy(() => import("pages/Chat"));
const Register = lazy(() => import("pages/Register"));
const Login = lazy(() => import("pages/Login"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));

// Lazy loaded routes
const routes = [
  {
    path: "/",
    Component: Join,
    requireAuth: false,
  },
  { path: "/chat", Component: Chat, requireAuth: false },
  {
    path: "/registrati",
    Component: Register,
    requireAuth: false,
  },
  { path: "/accedi", Component: Login, requireAuth: false },
];

const App: React.FC = () => {
  useGlobalStyles();

  return (
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          exact
          path={path}
          render={(routeProps) => (
            <Suspense fallback={<Spinner />}>
              <Component {...routeProps} />
            </Suspense>
          )}
        ></Route>
      ))}
      <Route
        path="*"
        render={() => (
          <Suspense fallback={<Spinner />}>
            <PageNotFound />
          </Suspense>
        )}
      />
    </Switch>
  );
};

export default App;
