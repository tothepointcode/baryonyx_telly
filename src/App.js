import React from "react";

// React router
import { Switch, Route } from "react-router-dom";

// Components
import DetailsPage from "./components/DetailsPage";
import MainPage from "./components/MainPage";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/details/:id">
          <DetailsPage />
        </Route>

        <Route path="/:category">
          <MainPage />
        </Route>

        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}
