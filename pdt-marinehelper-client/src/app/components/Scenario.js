import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import axios from "axios";
import "./Scenario.css";

import { Map } from "./Map";
import { Grid, Col, Row } from "react-bootstrap";
import { PageHeader, Checkbox } from "react-bootstrap";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

export const Scenario = createReactClass({
  getInitialState() {
    let scenario = this._getScenario();
    return {
      scenario,
      open: false,
      activated: null,
      startPosition: {},
      endPosition: {}
    };
  },

  componentDidUpdate() {
    let scenario = this._getScenario();
    if (this.state.scenario !== scenario) {
      this.setState({
        scenario
      });

      switch (scenario) {
        case "harbours":
          this._getHarbours();
          break;
        case "dangers":
          break;
        case "coves":
          break;
        default:
          break;
      }
    }
  },

  _getScenario() {
    let parsedUrl = new URL(window.location.href);
    return parsedUrl.searchParams.get("scenario");
  },

  _getHarbours() {
    axios
      .get("http://localhost:3001/harbours/getAllHarbours")
      .then(res => {
        this.setState({
          harbours: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  _getHarbour(id) {
    axios
      .get(`http://localhost:3001/harbours/getHarbour?id=${id}`)
      .then(res => {
        this.setState({
          harbour: res.data.result[0]
        });
        console.log(res.data.result[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },

  _handleMapClick(evt) {
    if (this.state.activated !== null) {
      if (this.state.activated === 1) {
        this.setState({
          startPosition: evt.lngLat,
          activated: null
        });
      }
      if (this.state.activated === 2) {
        this.setState({
          endPosition: evt.lngLat,
          activated: null
        });
      }
    }
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
                  <Checkbox>{"Toilets"}</Checkbox>
                  <Checkbox>{"Showers"}</Checkbox>
                  <Checkbox>{"Electricity"}</Checkbox>
                  <Checkbox>{"Fuel station"}</Checkbox>
                  <Checkbox>{"Chandler"}</Checkbox>
                  <Checkbox>{"Laundrette"}</Checkbox>
                  <Checkbox>{"Boatyard"}</Checkbox>
                  <Checkbox>{"Slipway"}</Checkbox>
                  <Checkbox>{"Boat hoist"}</Checkbox>
                  <Checkbox>{"Visitor berth"}</Checkbox>
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
                      <FormControl
                        type="text"
                        placeholder="lat"
                        value={this.state.startPosition.lat}
                        onChange={e => {
                          let startPosition = {
                            ...this.state.startPosition,
                            lat: e.target.value
                          };
                          this.setState({
                            startPosition
                          });
                        }}
                      />
                      <InputGroup.Button style={{ width: "0" }} />
                      <FormControl
                        type="text"
                        placeholder="lng"
                        value={this.state.startPosition.lng}
                        onChange={e => {
                          let startPosition = {
                            ...this.state.startPosition,
                            lng: e.target.value
                          };
                          this.setState({
                            startPosition
                          });
                        }}
                      />
                      <InputGroup.Button>
                        <Button
                          onClick={() => {
                            this.setState({ activated: 1 });
                          }}
                        >
                          select
                        </Button>
                      </InputGroup.Button>
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Addon>2</InputGroup.Addon>
                      <FormControl
                        type="text"
                        placeholder="lat"
                        value={this.state.endPosition.lat}
                        onChange={e => {
                          let endPosition = {
                            ...this.state.endPosition,
                            lat: e.target.value
                          };
                          this.setState({
                            endPosition
                          });
                        }}
                      />
                      <InputGroup.Button style={{ width: "0" }} />
                      <FormControl
                        type="text"
                        placeholder="lng"
                        value={this.state.endPosition.lng}
                        onChange={e => {
                          let endPosition = {
                            ...this.state.endPosition,
                            lng: e.target.value
                          };
                          this.setState({
                            endPosition
                          });
                        }}
                      />
                      <InputGroup.Button>
                        <Button
                          onClick={() => {
                            this.setState({ activated: 2 });
                          }}
                        >
                          select
                        </Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </Form>
                </Row>
                <Row>
                  <h2>{"Choose dangers to show"}</h2>
                  <Checkbox>{"Isolated dangers"}</Checkbox>
                  <Checkbox>{"Beacons"}</Checkbox>
                  <Checkbox>{"Rocks"}</Checkbox>
                  <Checkbox>{"Buoys"}</Checkbox>
                  <Checkbox>{"Wrecks"}</Checkbox>
                  <Checkbox>{"Cardinal signs"}</Checkbox>
                  <Checkbox>{"Special purpose signs"}</Checkbox>
                  <Checkbox>{"Lights"}</Checkbox>
                  <Checkbox>{"Coast lines"}</Checkbox>
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
                  <Checkbox>{"Anchorages"}</Checkbox>
                  <Checkbox>{"Moorings"}</Checkbox>
                  <Checkbox>{"Show underwater cables/pipes"}</Checkbox>
                  <Checkbox>{"Show restricted areas"}</Checkbox>
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

        <Map
          onClick={this._handleMapClick}
          geoJson={this.state.geoJson}
          harbours={
            this.state.scenario === "harbours" ? this.state.harbours : null
          }
          onHarbourClick={this._getHarbour}
          harbour={
            this.state.scenario === "harbours" ? this.state.harbour : null
          }
        />
      </div>
    );
  }
});