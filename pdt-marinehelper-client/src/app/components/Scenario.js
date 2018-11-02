import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import axios from "axios";
import "./Scenario.css";

import { Map } from "./Map";
import { Grid, Col, Row} from "react-bootstrap";
import { PageHeader, Checkbox } from "react-bootstrap";
import { Form, FormGroup, ControlLabel, FormControl, Button, InputGroup } from "react-bootstrap";

export const Scenario = createReactClass({
  getInitialState() {
    let scenario = this._getScenario();
    return {
      scenario,
      open: false
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
            <Grid fluid={true}>
              <Col xs={12}>
                <Row>
                  <PageHeader>{"Harbours"}</PageHeader>
                </Row>
                <Row>
                  <Checkbox>
                    {"Toilets"}
                  </Checkbox>
                  <Checkbox>
                    {"Showers"}
                  </Checkbox>
                  <Checkbox>
                    {"Electricity"}
                  </Checkbox>
                  <Checkbox>
                    {"Fuel station"}
                  </Checkbox>
                  <Checkbox>
                    {"Chandler"}
                  </Checkbox>
                  <Checkbox>
                    {"Laundrette"}
                  </Checkbox>
                  <Checkbox>
                    {"Boatyard"}
                  </Checkbox>
                  <Checkbox>
                    {"Slipway"}
                  </Checkbox>
                  <Checkbox>
                    {"Boat hoist"}
                  </Checkbox>
                  <Checkbox>
                    {"Visitor berth"}
                  </Checkbox>
                </Row>
              </Col>
            </Grid>
          </div>
        );
        break;
        case "dangers":
        controls = (
          <div className="scenario-controls">
          <Grid fluid={true}>
            <Col xs={12}>
              <Row>
                <PageHeader>{"Dangers"}</PageHeader>
              </Row>
              <Row>
                <h2>{"Select line of your cruise"}</h2>
                <Form horizontal>
                  <InputGroup>
                    <InputGroup.Addon>1</InputGroup.Addon>
                    <FormControl type="text" />
                    <InputGroup.Button style={{width: "0"}} />
                    <FormControl type="text" />
                    <InputGroup.Button>
                      <Button>select</Button>
                    </InputGroup.Button>
                  </InputGroup>
                  <InputGroup>
                  <InputGroup.Addon>2</InputGroup.Addon>
                    <FormControl type="text" />
                    <InputGroup.Button style={{width: "0"}} />
                    <FormControl type="text" />
                    <InputGroup.Button>
                      <Button>select</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </Form>
              </Row>
              <Row>
                <h2>{"Choose dangers to show"}</h2>
                <Checkbox>
                  {"Isolated dangers"}
                </Checkbox>
                <Checkbox>
                  {"Beacons"}
                </Checkbox>
                <Checkbox>
                  {"Rocks"}
                </Checkbox>
                <Checkbox>
                  {"Buoys"}
                </Checkbox>
                <Checkbox>
                  {"Wrecks"}
                </Checkbox>
                <Checkbox>
                  {"Cardinal signs"}
                </Checkbox>
                <Checkbox>
                  {"Special purpose signs"}
                </Checkbox>
                <Checkbox>
                  {"Lights"}
                </Checkbox>
                <Checkbox>
                  {"Coast lines"}
                </Checkbox>
              </Row>
            </Col>
          </Grid>
        </div>
        );
        break;
        case "coves":
        controls = (
          <div className="scenario-controls">
            <Grid fluid={true}>
              <Col xs={12}>
                <Row>
                  <PageHeader>{"Coves"}</PageHeader>
                </Row>
                <Row>
                  <Checkbox>
                    {"Anchorages"}
                  </Checkbox>
                  <Checkbox>
                    {"Moorings"}
                  </Checkbox>
                  <Checkbox>
                    {"Show underwater cables/pipes"}
                  </Checkbox>
                  <Checkbox>
                    {"Show restricted areas"}
                  </Checkbox>
                </Row>
              </Col>
            </Grid>
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
