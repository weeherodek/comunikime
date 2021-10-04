import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Product from "../pages/createProduct";
import Home from "../pages/home";

function route() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/product" exact>
          <Product />
        </Route>
      </Switch>
    </Router>
  );
}

export default route;
