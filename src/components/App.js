import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUser } from "../context/UserContext";

export default function App() {
  var { currentUser } = useUser();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  /* 
    Function checks if the user is authenticated before loading page
    If not authenticated redirect to login page
  */
  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          props => currentUser ? (React.createElement(component, props)) 
          : ( <Redirect to={{ pathname: "/login", state: { from: props.location, }, }}/> )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          props => currentUser ? ( <Redirect to={{ pathname: "/", }}/>) 
          : ( React.createElement(component, props))
        }
      />
    );
  }
}
