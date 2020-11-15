import React from "react";
import { Router } from "@reach/router";
import Route, { PrivateRoute } from "./Route";

import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

import "../utilities.css";
import { UserProvider } from "../context/UserContext";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route default component={NotFound} />
      </Router>
    </UserProvider>
  );
};

export default App;
