import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import { ZoomControl, Marker, Popup } from "react-mapbox-gl";

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
const invisibleLayout = { visibility: "invisible" };
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

const geojson = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [16, 43]
  },
  properties: {
    name: "Dinagat Islands"
  }
};

export const Map = createReactClass({
  propTypes: {
    onClick: PropTypes.func,
    onHarbourClick: PropTypes.func,

    geoJson: PropTypes.object,
    harbours: PropTypes.array,
    harbour: PropTypes.object,
    harbourFacilities: PropTypes.object,
    dangers: PropTypes.object,
    coves: PropTypes.object,
    underWaterPipesAndCables: PropTypes.object,
    restrictedAreas: PropTypes.object
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
            <img src={"http://maps.google.com/mapfiles/ms/icons/sailing.png"} />
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

  _showCoves() {
    const coves = this.props.coves;
    if (coves) {
      return coves.map((cove, i) => {
        return (
          <Marker
            key={i}
            coordinates={cove.geojson.coordinates}
            anchor="bottom"
          >
            <img src={"http://maps.google.com/mapfiles/ms/icons/sailing.png"} />
          </Marker>
        );
      });
    }
  },

  _showUnderwaterPipesAndCables() {},

  _showRestrictedAreas() {},

  render() {
    return (
      <Mapbox
        onStyleLoad={el => (this.map = el)}
        style="mapbox://styles/zulbaijin/cjngbh3k2242n2snt2lk1345f"
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
        <Marker coordinates={[16, 43]} anchor="bottom">
          <div>asdf</div>
        </Marker>
        <GeoJSONLayer
          data={this.props.geoJson}
          lineLayout={lineLayout}
          linePaint={linePaint}
          fillLayout={fillLayout}
          fillPaint={fillPaint}
        />
        <GeoJSONLayer
          data={geojson}
          symbolLayout={symbolLayout}
          symbolPaint={symbolPaint}
          circleLayout={circleLayout}
          circlePaint={circlePaint}
        />
        {this._showHarbours()}
        {this._showHarbourPopup()}
        {this._showHarbourGeometry()}

        {this._showHarbourFacilities()}

        {this._showDangers()}

        {this._showCoves()}
        {this._showUnderwaterPipesAndCables()}
        {this._showRestrictedAreas()}
      </Mapbox>
    );
  }
});
