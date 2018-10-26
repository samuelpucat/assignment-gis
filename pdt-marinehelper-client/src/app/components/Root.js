import React from "react";
import { Header } from "./Header";
import {Scenario} from "./Scenario";
import { About } from "./About";
import { Switch, Route } from "react-router";

export class Root extends React.Component {
  render() {
    return (
      <div className="container-full-width" style={{height: "100vh", display: "flex", flexDirection: "column"}}>
        <Header />
        <main style={{height: "-webkit-fill-available"}}>
          <Switch>
            <Route exact path="/" component={Scenario} />
            <Route path="/map" component={Scenario} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </div>
    );
  }
}
