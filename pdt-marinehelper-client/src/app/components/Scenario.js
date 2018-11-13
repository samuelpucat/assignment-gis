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
      endPosition: {},
      showIsolatedDangers: false,
      showLateralSigns: false,
      showCardinalSigns: false,
      showSpecialPurposeSigns: false,
      showLights: false,
      showRocks: false,
      showWrecks: false,
      showCoastLines: false,

      myPosition: [16, 43],
      showAnchorages: false,
      showMoorings: false,
      showUnderwaterPipesAndCables: false
    };
  },

  componentDidMount() {
    let scenario = this._getScenario();

    switch (scenario) {
      case "harbours":
        this._getHarbours();
        break;
      case "dangers":
        this._getDangers();
        break;
      case "coves":
        if (this.state.myPosition) {
          this._getCoves();
        }
        break;
      default:
        break;
    }
  },

  componentDidUpdate(prevProps, prevState) {
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
          this._getDangers();
          break;
        case "coves":
          this._getCoves();
          break;
        default:
          break;
      }
    }

    if (this.state.myPosition !== prevState.myPosition) {
      this._getCoves();
    }

    if (
      this.state.startPosition !== prevState.startPosition ||
      this.state.endPosition !== prevState.endPosition
    ) {
      this._getDangers();
    }
  },

  _getScenario() {
    let parsedUrl = new URL(window.location.href);
    return parsedUrl.searchParams.get("scenario");
  },

  _myPositionChange(pos) {
    this.setState({
      myPosition: pos
    });
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

  _getDangers() {
    let startPosition = this.state.startPosition;
    let endPosition = this.state.endPosition;
    if (
      startPosition.hasOwnProperty("lat") &&
      startPosition.hasOwnProperty("lng") &&
      endPosition.hasOwnProperty("lat") &&
      endPosition.hasOwnProperty("lng")
    ) {
      const geojson = {
        type: "LineString",
        coordinates: [
          [startPosition.lng, startPosition.lat],
          [endPosition.lng, endPosition.lat]
        ]
      };
      this._getIsolatedDangers(geojson);
      this._getLateralSigns(geojson);
    }
  },

  _getIsolatedDangers(geojson) {
    axios
      .post(`http://localhost:3001/dangers/getIsolatedDangers`, {
        geojson: geojson,
        buffer: 1000
      })
      .then(res => {
        this.setState({
          isolatedDangers: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  _getLateralSigns(geojson){
    axios
    .post(`http://localhost:3001/dangers/getLateralSigns`, {
      geojson: geojson,
      buffer: 1000
    })
    .then(res => {
      this.setState({
        lateralSigns: res.data.result
      });
    })
    .catch(err => {
      console.log(err);
    });
  },

  _getCoves() {
    this._getAnchorages();
    this._getMoorings();
    this._getUnderwaterCablesAndPipes();
  },

  _getAnchorages() {
    axios
      .get("http://localhost:3001/coves/getNearbyAnchorages", {
        params: {
          lng: this.state.myPosition[0],
          lat: this.state.myPosition[1],
          maxDistance: 30000
        }
      })
      .then(res => {
        this.setState({
          anchorages: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  _getMoorings() {
    axios
      .get("http://localhost:3001/coves/getNearbyMoorings", {
        params: {
          lat: this.state.myPosition[1],
          lng: this.state.myPosition[0],
          maxDistance: 30000
        }
      })
      .then(res => {
        this.setState({
          moorings: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  _getUnderwaterCablesAndPipes() {
    axios
      .get("http://localhost:3001/coves/getNearbyUnderwaterCablesAndPipes", {
        params: {
          lat: this.state.myPosition[1],
          lng: this.state.myPosition[0],
          maxDistance: 30000
        }
      })
      .then(res => {
        this.setState({
          underwaterCablesAndPipes: res.data.result
        });
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
                        value={this.state.startPosition.lat || ""}
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
                        value={this.state.startPosition.lng || ""}
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
                        value={this.state.endPosition.lat || ""}
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
                        ref={elng => (this.elng = elng)}
                        type="text"
                        placeholder="lng"
                        value={this.state.endPosition.lng || ""}
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
                  <Checkbox
                    checked={this.state.showIsolatedDangers}
                    onChange={e =>
                      this.setState({ showIsolatedDangers: e.target.checked })
                    }
                  >
                    {"Isolated dangers"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showLateralSigns}
                    onChange={e =>
                      this.setState({ showLateralSigns: e.target.checked })
                    }
                  >
                    {"Lateral signs"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showCardinalSigns}
                    onChange={e =>
                      this.setState({ showCardinalSigns: e.target.checked })
                    }
                  >
                    {"Cardinal signs"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showSpecialPurposeSigns}
                    onChange={e =>
                      this.setState({
                        showSpecialPurposeSigns: e.target.checked
                      })
                    }
                  >
                    {"Special purpose signs"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showLights}
                    onChange={e =>
                      this.setState({ showLights: e.target.checked })
                    }
                  >
                    {"Lights"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showRocks}
                    onChange={e =>
                      this.setState({ showRocks: e.target.checked })
                    }
                  >
                    {"Rocks"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showWrecks}
                    onChange={e =>
                      this.setState({ showWrecks: e.target.checked })
                    }
                  >
                    {"Wrecks"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showCoastLines}
                    onChange={e =>
                      this.setState({ showCoastLines: e.target.checked })
                    }
                  >
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
                  <Checkbox
                    checked={this.state.showAnchorages}
                    onChange={e =>
                      this.setState({ showAnchorages: e.target.checked })
                    }
                  >
                    {"Anchorages"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showMoorings}
                    onChange={e =>
                      this.setState({ showMoorings: e.target.checked })
                    }
                  >
                    {"Moorings"}
                  </Checkbox>
                  <Checkbox
                    checked={this.state.showUnderwaterPipesAndCables}
                    onChange={e =>
                      this.setState({
                        showUnderwaterPipesAndCables: e.target.checked
                      })
                    }
                  >
                    {"Show underwater cables/pipes"}
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

    let startPosition = this.state.startPosition;
    let endPosition = this.state.endPosition;
    let wayLine = null;
    if (
      startPosition.hasOwnProperty("lat") &&
      startPosition.hasOwnProperty("lng") &&
      endPosition.hasOwnProperty("lat") &&
      endPosition.hasOwnProperty("lng")
    ) {
      wayLine = {
        type: "LineString",
        coordinates: [
          [startPosition.lng, startPosition.lat],
          [endPosition.lng, endPosition.lat]
        ]
      };
    }

    return (
      <div className="scenario">
        {controls}

        <Map
          onClick={this._handleMapClick}
          shipPosition={this.state.myPosition}
          onShipPositionChange={this._myPositionChange}
          harbours={
            this.state.scenario === "harbours" ? this.state.harbours : null
          }
          onHarbourClick={this._getHarbour}
          harbour={
            this.state.scenario === "harbours" ? this.state.harbour : null
          }
          wayLine={this.state.scenario === "dangers" ? wayLine : null}
          isolatedDangers={
            this.state.scenario === "dangers" && this.state.showIsolatedDangers
              ? this.state.isolatedDangers
              : null
          }
          lateralSigns={
            this.state.scenario === "dangers" && this.state.showLateralSigns
              ? this.state.lateralSigns
              : null
          }
          anchorages={
            this.state.scenario === "coves" && this.state.showAnchorages
              ? this.state.anchorages
              : null
          }
          moorings={
            this.state.scenario === "coves" && this.state.showMoorings
              ? this.state.moorings
              : null
          }
          underwaterCablesAndPipes={
            this.state.scenario === "coves" &&
            this.state.showUnderwaterPipesAndCables
              ? this.state.underwaterCablesAndPipes
              : null
          }
        />
      </div>
    );
  }
});
