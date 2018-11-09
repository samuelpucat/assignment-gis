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

    waypoints: PropTypes.array,
    dangers: PropTypes.array,

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

  _showDangers() {},

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
            <img
              src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
              alt="anchorage"
            />
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
            <img
              src={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
              alt="mooring"
            />
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
            linePaint={{ "line-color": "red" }}
          />
        );
      });
    }
  },

  _showRestrictedAreas() {},

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
          const zoom = this.map.getZoom();
          this.setState({
            zoom: [zoom]
          });
        }}
        onMoveEnd={() => {
          const center = this.map.getCenter();
          this.setState({
            center: [center.lng, center.lat]
          });
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

        {this._showDangers()}

        {this._showAnchorages()}
        {this._showMoorings()}
        {this._showUnderwaterPipesAndCables()}
        {this._showRestrictedAreas()}
      </Mapbox>
    );
  }
});
