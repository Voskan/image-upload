import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Log = lazy(() => import("./pages/Log"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/" component={Home} exact sensitive />
      <Route path="/log/:id" component={Log} sensitive />
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Suspense>
);

export default App;
