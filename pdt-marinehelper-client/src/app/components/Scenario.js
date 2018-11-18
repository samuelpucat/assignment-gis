import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import axios from "axios";
import "./Scenario.css";

import { Map } from "./Map";
import { HarboursTable } from "./HarboursTable";

import { Grid, Col, Row } from "react-bootstrap";
import { PageHeader, Checkbox } from "react-bootstrap";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { Tabs, Tab, Table } from "react-bootstrap";

export const Scenario = createReactClass({
  getInitialState() {
    let scenario = this._getScenario();
    return {
      scenario,
      open: false,
      activated: null,

      showFacilities: [],

      startPosition: {},
      endPosition: {},
      showDangers: [],

      myPosition: [16, 43],
      showCoves: []
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
    let facilities = this.state.showFacilities;

    axios
      .post("http://localhost:3001/harbours/getAllWithFacilities", {
        buffer: 100,
        facilities: facilities
      })
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

  _getDangers(arg) {
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
      
      if (arg === "isolatedDangers" || arg === undefined)
        this._getIsolatedDangers(geojson);
      if (arg === "lateralSigns" || arg === undefined)
        this._getLateralSigns(geojson);
      if (arg === "cardinalSigns" || arg === undefined)
        this._getCardinalSigns(geojson);
      if (arg === "specialPurposeSigns" || arg === undefined)
        this._getSpecialPurposeSigns(geojson);
      if (arg === "lights" || arg === undefined) this._getLights(geojson);
      if (arg === "rocks" || arg === undefined) this._getRocks(geojson);
      if (arg === "wrecks" || arg === undefined) this._getWrecks(geojson);
      if (arg === "coastLines" || arg === undefined)
        this._getCoastLines(geojson);
    }
  },

  _getIsolatedDangers(geojson) {
    if (this.state.showDangers.includes("isolatedDangers")) {
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
    }
  },

  _getLateralSigns(geojson) {
    if (this.state.showDangers.includes("lateralSigns")) {
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
    }
  },

  _getCardinalSigns(geojson) {
    if (this.state.showDangers.includes("cardinalSigns")) {
      axios
        .post(`http://localhost:3001/dangers/getCardinalSigns`, {
          geojson: geojson,
          buffer: 1000
        })
        .then(res => {
          this.setState({
            cardinalSigns: res.data.result
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  _getSpecialPurposeSigns(geojson) {
    if (this.state.showDangers.includes("specialPurposeSigns")) {
      axios
        .post(`http://localhost:3001/dangers/getSpecialPurposeSigns`, {
          geojson: geojson,
          buffer: 1000
        })
        .then(res => {
          this.setState({
            specialPurposeSigns: res.data.result
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  _getLights(geojson) {
    if (this.state.showDangers.includes("lights")) {
      axios
        .post(`http://localhost:3001/dangers/getLights`, {
          geojson: geojson,
          buffer: 1000
        })
        .then(res => {
          this.setState({
            lights: res.data.result
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  _getRocks(geojson) {
    if (this.state.showDangers.includes("rocks")) {
      axios
        .post(`http://localhost:3001/dangers/getRocks`, {
          geojson: geojson,
          buffer: 1000
        })
        .then(res => {
          this.setState({
            rocks: res.data.result
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  _getWrecks(geojson) {
    if (this.state.showDangers.includes("wrecks")) {
      axios
        .post(`http://localhost:3001/dangers/getWrecks`, {
          geojson: geojson,
          buffer: 1000
        })
        .then(res => {
          this.setState({
            wrecks: res.data.result
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  _getCoastLines(geojson) {
    if (this.state.showDangers.includes("coastLines")) {
      axios
        .post(`http://localhost:3001/dangers/getCoastlines`, {
          geojson: geojson,
          buffer: 50
        })
        .then(res => {
          this.setState({
            coastLines: res.data.result
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  _getCoves(arg) {
    if (arg === "anchorages" || arg === undefined) this._getAnchorages();
    if (arg === "moorings" || arg === undefined) this._getMoorings();
    if (arg === "underwaterCableAndPipes" || arg === undefined)
      this._getUnderwaterCablesAndPipes();
  },

  _getAnchorages() {
    if (this.state.showCoves.includes("anchorages")) {
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
    }
  },

  _getMoorings() {
    if (this.state.showCoves.includes("moorings")) {
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
    }
  },

  _getUnderwaterCablesAndPipes() {
    if (this.state.showCoves.includes("underwaterCableAndPipes")) {
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
    }
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
    let tables = null;
    const scenario = this.state.scenario;
    switch (scenario) {
      case "harbours":
        const facilities = [
          {
            name: "Toilets",
            tag: "toilets"
          },
          {
            name: "Showers",
            tag: "showers"
          },
          {
            name: "Electricity",
            tag: "electricity"
          },
          {
            name: "Fuel station",
            tag: "fuel_station"
          },
          {
            name: "Chandler",
            tag: "chandler"
          },
          {
            name: "Laundrette",
            tag: "laundrette"
          },
          {
            name: "Boatyard",
            tag: "boatyard"
          },
          {
            name: "Slipway",
            tag: "slipway"
          },
          {
            name: "Boat hoist",
            tag: "boat_hoist"
          },
          {
            name: "Visitor berth",
            tag: "visitor_berth"
          }
        ];
        controls = (
          <div className="scenario-controls">
            <Grid fluid={true}>
              <Col xs={12}>
                <Row>
                  <PageHeader>{"Harbours"}</PageHeader>
                </Row>
                <Row>
                  {facilities.map((fac, i) => {
                    return (
                      <Checkbox
                        key={i}
                        checked={this.state.showFacilities.includes(fac.tag)}
                        onChange={e => {
                          let showFacilities = new Set(
                            this.state.showFacilities
                          );
                          showFacilities.has(fac.tag)
                            ? showFacilities.delete(fac.tag)
                            : showFacilities.add(fac.tag);
                          this.setState(
                            {
                              showFacilities: Array.from(showFacilities)
                            },
                            this._getHarbours
                          );
                        }}
                      >
                        {fac.name}
                      </Checkbox>
                    );
                  })}
                </Row>
              </Col>
            </Grid>
          </div>
        );
        if (this.state.harbours) {
          tables = (
            <div className="scenario-tables">
              <HarboursTable harbours={this.state.harbours} />
            </div>
          );
        }
        break;
      case "dangers":
        const dangers = [
          {
            name: "Isolated dangers",
            tag: "isolatedDangers"
          },
          {
            name: "Lateral signs",
            tag: "lateralSigns"
          },
          {
            name: "Cardinal signs",
            tag: "cardinalSigns"
          },
          {
            name: "Special purpose signs",
            tag: "specialPurposeSigns"
          },
          {
            name: "Lights",
            tag: "lights"
          },
          {
            name: "Rocks",
            tag: "rocks"
          },
          {
            name: "Wrecks",
            tag: "wrecks"
          },
          {
            name: "Coast lines",
            tag: "coastLines"
          }
        ];
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
                  {dangers.map((dan, i) => {
                    return (
                      <Checkbox
                        key={i}
                        checked={this.state.showDangers.includes(dan.tag)}
                        onChange={e => {
                          let showDangers = new Set(this.state.showDangers);
                          showDangers.has(dan.tag)
                            ? showDangers.delete(dan.tag)
                            : showDangers.add(dan.tag);
                          this.setState(
                            {
                              showDangers: Array.from(showDangers)
                            },
                            () => this._getDangers(dan.tag)
                          );
                        }}
                      >
                        {dan.name}
                      </Checkbox>
                    );
                  })}
                </Row>
              </Col>
            </Grid>
          </div>
        );
        break;
      case "coves":
        const coves = [
          {
            name: "Anchorages",
            tag: "anchorages"
          },
          {
            name: "Moorings",
            tag: "moorings"
          },
          {
            name: "Show underwater cables/pipes",
            tag: "underwaterCableAndPipes"
          }
        ];
        controls = (
          <div className="scenario-controls">
            <Grid fluid={true}>
              <Col xs={12}>
                <Row>
                  <PageHeader>{"Coves"}</PageHeader>
                </Row>
                <Row>
                  {coves.map((cov, i) => {
                    return (
                      <Checkbox
                        key={i}
                        checked={this.state.showCoves.includes(cov.tag)}
                        onChange={e => {
                          let showCoves = new Set(this.state.showCoves);
                          showCoves.has(cov.tag)
                            ? showCoves.delete(cov.tag)
                            : showCoves.add(cov.tag);
                          this.setState(
                            { showCoves: Array.from(showCoves) },
                            () => this._getCoves(cov.tag)
                          );
                        }}
                      >
                        {cov.name}
                      </Checkbox>
                    );
                  })}
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
        {tables}

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
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("isolatedDangers")
              ? this.state.isolatedDangers
              : null
          }
          lateralSigns={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("lateralSigns")
              ? this.state.lateralSigns
              : null
          }
          cardinalSigns={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("cardinalSigns")
              ? this.state.cardinalSigns
              : null
          }
          specialPurposeSigns={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("specialPurposeSigns")
              ? this.state.specialPurposeSigns
              : null
          }
          lights={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("lights")
              ? this.state.lights
              : null
          }
          rocks={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("rocks")
              ? this.state.rocks
              : null
          }
          wrecks={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("wrecks")
              ? this.state.wrecks
              : null
          }
          coastLines={
            this.state.scenario === "dangers" &&
            this.state.showDangers.includes("coastLines")
              ? this.state.coastLines
              : null
          }
          anchorages={
            this.state.scenario === "coves" &&
            this.state.showCoves.includes("anchorages")
              ? this.state.anchorages
              : null
          }
          moorings={
            this.state.scenario === "coves" &&
            this.state.showCoves.includes("moorings")
              ? this.state.moorings
              : null
          }
          underwaterCablesAndPipes={
            this.state.scenario === "coves" &&
            this.state.showCoves.includes("underwaterCableAndPipes")
              ? this.state.underwaterCablesAndPipes
              : null
          }
        />
      </div>
    );
  }
});
