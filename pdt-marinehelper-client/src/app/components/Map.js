import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import { ZoomControl, Marker, Popup, Layer, Feature } from "react-mapbox-gl";
import ship_icon from "../../assets/sailing.png";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoienVsYmFpamluIiwiYSI6ImNqbmdhZmk0YjAxNWEzcXFycHdhOThoMWsifQ.VvGH0r6toaDMxIRXcwm_SQ"
});

const symbolLayout = {
  "text-field": "{name}",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top"
};
const symbolPaint = {
  "text-color": "black"
};

const circleLayout = { visibility: "visible" };
const circlePaint = {
  "circle-color": "#088"
};

const lineLayout = { visibility: "visible" };
const linePaint = {
  "line-color": "#088"
};

const fillLayout = {
  visibility: "visible"
};
const fillPaint = {
  "fill-color": "#088",
  "fill-opacity": 0.4
};

export const Map = createReactClass({
  propTypes: {
    onClick: PropTypes.func,
    onShipPositionChange: PropTypes.func,
    shipPosition: PropTypes.array,

    harbours: PropTypes.array,
    onHarbourClick: PropTypes.func,
    harbour: PropTypes.object,
    harbourFacilities: PropTypes.array,

    wayLine: PropTypes.object,
    isolatedDangers: PropTypes.array,
    lateralSigns: PropTypes.array,
    cardinalSigns: PropTypes.array,
    specialPurposeSigns: PropTypes.array,
    lights: PropTypes.array,
    rocks: PropTypes.array,
    wrecks: PropTypes.array,
    coastLines: PropTypes.array,

    anchorages: PropTypes.array,
    moorings: PropTypes.array,
    underwaterCablesAndPipes: PropTypes.array,
    restrictedAreas: PropTypes.array
  },

  getInitialState() {
    return {
      zoom: [8],
      center: [16, 43]
    };
  },

  _showHarbours() {
    const harbours = this.props.harbours;
    if (harbours) {
      return harbours.map((har, i) => {
        if (this.props.harbour && this.props.harbour.osm_id === har.osm_id)
          return null;

        return (
          <Marker
            key={i}
            coordinates={har.center.coordinates}
            anchor="bottom"
            onClick={() => {
              this.props.onHarbourClick(har.osm_id);
            }}
          >
            <img
              src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
              alt="harbour"
            />
          </Marker>
        );
      });
    }
  },

  _showHarbourPopup() {
    const harbour = this.props.harbour;
    if (harbour) {
      return (
        <Popup coordinates={harbour.center.coordinates}>
          <div>{harbour.name}</div>
        </Popup>
      );
    }
  },

  _showHarbourGeometry() {
    const harbour = this.props.harbour;
    if (harbour) {
      return (
        <GeoJSONLayer
          data={harbour.geometry}
          lineLayout={lineLayout}
          linePaint={linePaint}
          fillLayout={fillLayout}
          fillPaint={fillPaint}
        />
      );
    }
  },

  _showHarbourFacilities() {},

  _showWay() {
    const wayLine = this.props.wayLine;
    if (wayLine) {
      return (
        <GeoJSONLayer
          data={wayLine}
          lineLayout={lineLayout}
          linePaint={{ "line-color": "blue" }}
        />
      );
    }
  },

  _showIsolatedDangers() {
    const isolatedDangers = this.props.isolatedDangers;
    if (isolatedDangers) {
      return isolatedDangers.map((isolatedDanger, i) => {
        return (
          <Marker
            key={i}
            coordinates={isolatedDanger.center.coordinates}
            anchor="bottom"
          >
            {"isolated danger"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="isolated danger"
              />
            </div>
          </Marker>
        );
      });
    }
  },

  _showLateralSigns() {
    const lateralSigns = this.props.lateralSigns;
    if (lateralSigns) {
      return lateralSigns.map((lateralSign, i) => {
        return (
          <Marker
            key={i}
            coordinates={lateralSign.center.coordinates}
            anchor="bottom"
          >
            {"lateral sign"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="lateral sign"
              />
            </div>
          </Marker>
        );
      });
    }
  },

  _showCardinalSigns() {
    const cardinalSigns = this.props.cardinalSigns;
    if (cardinalSigns) {
      return cardinalSigns.map((cardinalSign, i) => {
        return (
          <Marker
            key={i}
            coordinates={cardinalSign.center.coordinates}
            anchor="bottom"
          >
            {"cardinal sign"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="lateral sign"
              />
            </div>
          </Marker>
        );
      });
    }
  },
  _showSpecialPurposeSigns() {
    const specialPurposeSigns = this.props.specialPurposeSigns;
    if (specialPurposeSigns) {
      return specialPurposeSigns.map((specialPurposeSign, i) => {
        return (
          <Marker
            key={i}
            coordinates={specialPurposeSign.center.coordinates}
            anchor="bottom"
          >
            {"special purpose sign"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="lateral sign"
              />
            </div>
          </Marker>
        );
      });
    }
  },
  _showLights() {
    const lights = this.props.lights;
    if (lights) {
      return lights.map((light, i) => {
        return (
          <Marker
            key={i}
            coordinates={light.center.coordinates}
            anchor="bottom"
          >
            {"light"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="lateral sign"
              />
            </div>
          </Marker>
        );
      });
    }
  },
  _showRocks() {
    const rocks = this.props.rocks;
    if (rocks) {
      return rocks.map((rock, i) => {
        return (
          <Marker key={i} coordinates={rock.center.coordinates} anchor="bottom">
            {"rock"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="lateral sign"
              />
            </div>
          </Marker>
        );
      });
    }
  },
  _showWrecks() {
    const wrecks = this.props.wrecks;
    if (wrecks) {
      return wrecks.map((wreck, i) => {
        return (
          <Marker
            key={i}
            coordinates={wreck.center.coordinates}
            anchor="bottom"
          >
            {"wreck"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="lateral sign"
              />
            </div>
          </Marker>
        );
      });
    }
  },
  _showCoastLines() {
    const coastLines = this.props.coastLines;
    if (coastLines) {
      return coastLines.map((coastLine, i) => {
        return (
          <GeoJSONLayer
            key={i}
            data={coastLine.geometry}
            lineLayout={lineLayout}
            linePaint={{ "line-color": "red", "line-width": 5 }}
          />
        );
      });
    }
  },

  _showAnchorages() {
    const anchorages = this.props.anchorages;
    if (anchorages) {
      return anchorages.map((anchorage, i) => {
        return (
          <Marker
            key={i}
            coordinates={anchorage.center.coordinates}
            anchor="bottom"
          >
            {"anchorage"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="anchorage"
              />
            </div>
          </Marker>
        );
      });
    }
  },

  _showMoorings() {
    const moorings = this.props.moorings;
    if (moorings) {
      return moorings.map((mooring, i) => {
        return (
          <Marker
            key={i}
            coordinates={mooring.center.coordinates}
            anchor="bottom"
          >
            {"mooring"}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
                alt="mooring"
              />
            </div>
          </Marker>
        );
      });
    }
  },

  _showUnderwaterPipesAndCables() {
    const pipesAndCables = this.props.underwaterCablesAndPipes;
    if (pipesAndCables) {
      return pipesAndCables.map((pac, i) => {
        return (
          <GeoJSONLayer
            key={i}
            data={pac.geometry}
            lineLayout={lineLayout}
            linePaint={{ "line-color": "red"}}
          />
        );
      });
    }
  },

  _showLineString() {
    let gj = {
      type: "Polygon",
      coordinates: [
        [
          [13.9440558, 44.7731266004883],
          [13.9443121, 44.7737070004883],
          [13.9443205, 44.7744186004882],
          [13.9444071, 44.7746906004882],
          [13.9446404, 44.7749119004882],
          [13.9455877, 44.7754511004881],
          [13.9467685, 44.7754772004881],
          [13.9472326, 44.7748024004882],
          [13.9474532, 44.7736356004883],
          [13.9478833, 44.7735964004883],
          [13.948104, 44.7737139004883],
          [13.9481922, 44.7735181004883],
          [13.9487547, 44.7733928004883],
          [13.9493063, 44.7730405004883],
          [13.9493283, 44.7727351004883],
          [13.9497144, 44.7724532004884],
          [13.9495339, 44.7719107004884],
          [13.9490602, 44.7705986004885],
          [13.9479537, 44.7697150004886],
          [13.9469036, 44.7693790004886],
          [13.9454353, 44.7695640004886],
          [13.9449298, 44.7707543004885],
          [13.9450154, 44.7719520004884],
          [13.9442352, 44.7722488004884],
          [13.9440558, 44.7731266004883]
        ]
      ]
    };
    return (
      <GeoJSONLayer
        data={gj}
        lineLayout={lineLayout}
        linePaint={{ "line-color": "red", "line-width": 5 }}
      />
    );
  },

  render() {
    const ship = new Image();
    ship.src = ship_icon;
    const images = ["ship", ship];

    return (
      <Mapbox
        onStyleLoad={el => (this.map = el)}
        style={"mapbox://styles/zulbaijin/cjngbh3k2242n2snt2lk1345f"}
        center={this.state.center}
        zoom={this.state.zoom}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        onZoomEnd={() => {
          if (this.map) {
            const zoom = this.map.getZoom();
            this.setState({
              zoom: [zoom]
            });
          }
        }}
        onMoveEnd={() => {
          if (this.map) {
            const center = this.map.getCenter();
            this.setState({
              center: [center.lng, center.lat]
            });
          }
        }}
        onClick={(map, evt) => {
          this.props.onClick(evt);
        }}
        onMouseMove={(map, evt) => {
          //console.log(evt);
        }}
      >
        <ZoomControl />

        <Layer
          type="symbol"
          id="shipPosition"
          layout={{ "icon-image": "ship", "icon-allow-overlap": true }}
          images={images}
        >
          <Feature
            coordinates={this.props.shipPosition}
            draggable
            onDragEnd={evt => {
              this.props.onShipPositionChange([evt.lngLat.lng, evt.lngLat.lat]);
            }}
          />
        </Layer>

        {this._showHarbours()}
        {this._showHarbourPopup()}
        {this._showHarbourGeometry()}
        {this._showHarbourFacilities()}

        {this._showWay()}
        {this._showIsolatedDangers()}
        {this._showLateralSigns()}
        {this._showCardinalSigns()}
        {this._showSpecialPurposeSigns()}
        {this._showLights()}
        {this._showRocks()}
        {this._showWrecks()}
        {this._showCoastLines()}

        {this._showAnchorages()}
        {this._showMoorings()}
        {this._showUnderwaterPipesAndCables()}

        {this._showLineString()}
      </Mapbox>
    );
  }
});
