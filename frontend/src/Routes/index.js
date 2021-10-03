import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "../App";
import Product from "../pages/createProduct";

function route() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/product" exact component={Product} />
      </Switch>
    </Router>
  );
}

export default route;
