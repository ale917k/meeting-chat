import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { loginUserWithToken, retrieveUser } from "api/users";
import Store from "context";
import UserTypes from "context/user/types";
import { useGlobalStyles } from "globalStyles";
import Spinner from "components/global/Spinner";
import Header from "components/global/Header";

// Lazy loaded pages
const Home = lazy(() => import("pages/Home"));
const Join = lazy(() => import("pages/Join"));
const Settings = lazy(() => import("pages/Settings"));
const Register = lazy(() => import("pages/Register"));
const Login = lazy(() => import("pages/Login"));
const PageNotFound = lazy(() => import("pages/PageNotFound"));

// Lazy loaded routes
const routes = [
  {
    path: "/",
    Component: Home,
    inApp: true,
  },
  { path: "/chats", Component: Join, inApp: true },
  { path: "/impostazioni", Component: Settings, inApp: true },
  {
    path: "/registrati",
    Component: Register,
    inApp: false,
  },
  { path: "/accedi", Component: Login, inApp: false },
];

/**
 * Top-level App component containing all main routes.
 */
const App: React.FC = () => {
  useGlobalStyles();

  // Context for retrieving User state from Store
  const { user, dispatch } = useContext(Store);

  useEffect(() => {
    // Check if any localStorage token already exist
    const token = window.localStorage.getItem("mChatAccToken");

    token &&
      !user &&
      loginUserWithToken(token)
        .then((userId) =>
          retrieveUser(userId as string)
            .then((loggedUser) =>
              dispatch({
                type: UserTypes.Set,
                payload: loggedUser as User,
              }),
            )
            .catch((err) => console.error("retrieveUser App err", err)),
        )
        .catch((err) => console.error("loginUserWithToken App err", err));
  }, []);

  return (
    <>
      <Route path={routes.filter((route) => route.inApp).map((route) => route.path)} render={() => <Header />} />
      <Switch>
        {routes.map(({ path, Component, inApp }) => (
          <Route key={path} exact path={path}>
            {path === "/registrati" || path === "/accedi" ? (
              <>
                {user ? (
                  <Redirect to="/" />
                ) : (
                  <Suspense fallback={<Spinner />}>
                    <Component />
                  </Suspense>
                )}
              </>
            ) : inApp && !user ? (
              <Redirect to="/accedi" />
            ) : (
              <Suspense fallback={<Spinner />}>
                <Component />
              </Suspense>
            )}
          </Route>
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
    </>
  );
};

export default App;
