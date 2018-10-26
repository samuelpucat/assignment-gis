import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import axios from "axios";
import "./Scenario.css";

import { Map } from "./Map";

export const Scenario = createReactClass({
  getInitialState() {
    let scenario = this._getScenario();
    return {
      scenario
    };
  },

  componentDidMount() {
    axios
      .get("http://localhost:3001/harbours/getHarbour?id=244608718")
      .then(res => {
        this.setState({
          geoJson: res.data.result[0].way
        });
        console.log(res.data.result[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },

  componentDidUpdate() {
    let scenario = this._getScenario();
    if (this.state.scenario !== scenario) {
      this.setState({
        scenario
      });
    }
  },

  _getScenario() {
    let parsedUrl = new URL(window.location.href);
    return parsedUrl.searchParams.get("scenario");
  },

  render() {
    let controls = null;
    const scenario = this.state.scenario;
    switch (scenario) {
      case "harbours":
        controls = (
          <div className="scenario-controls">
            <h1>{scenario}</h1>
          </div>
        );
        break;
        case "dangers":
        controls = (
          <div className="scenario-controls">
            <h1>{scenario}</h1>
          </div>
        );
        break;
        case "anchorages":
        controls = (
          <div className="scenario-controls">
            <h1>{scenario}</h1>
          </div>
        );
        break;
      default:
        controls = null;
    }
    return (
      <div className="scenario">
        {controls}

        <Map geoJson={this.state.geoJson} />
      </div>
    );
  }
});
