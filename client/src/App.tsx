import React from "react";
import { Route, Switch } from "react-router-dom";
import { useGlobalStyles } from "globalStyles";
import Join from "components/chats/Join";
import Chat from "components/chats/Chat";
import Register from "pages/Register";
import Login from "pages/Login";

const App: React.FC = () => {
  useGlobalStyles();

  return (
    <Switch>
      <Route path="/" exact component={Join} />
      <Route path="/registrati" component={Register} />
      <Route path="/accedi" component={Login} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
};

export default App;
