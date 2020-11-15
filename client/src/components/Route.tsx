import React, { FunctionComponent, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

type Props = { component: FunctionComponent } & RouteComponentProps;

const Route: FunctionComponent<Props> = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

export const PrivateRoute: FunctionComponent<Props> = (props) => {
  const { user } = useContext(UserContext);

  if (user) {
    return <Route {...props} />;
  }

  return <Redirect to="/signup" />;
};

export default Route;
