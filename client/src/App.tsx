import React from "react";
import { Route, Switch } from "react-router-dom";
import { useGlobalStyles } from "globalStyles";
import Join from "./components/Join";
import Chat from "./components/Chat";

const App: React.FC = () => {
  useGlobalStyles();

  return (
    <Switch>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
};

export default App;
