import React from "react";
import { Header } from "./Header";
import { Map } from "./Map";
import { Harbours } from "./Harbours";
import { Anchorages } from "./Anchorages";
import { Dangers } from "./Dangers";
import { About } from "./About";
import { Switch, Route } from "react-router";

export class Root extends React.Component {
  render() {
    return (
      <div className="container-full-width" style={{height: "100vh", display: "flex", flexDirection: "column"}}>
        <Header />
        <main style={{height: "100%"}}>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route path="/map" component={Map} />
            <Route path="/harbours" component={Harbours} />
            <Route path="/anchorages" component={Anchorages} />
            <Route path="/dangers" component={Dangers} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </div>
    );
  }
}
