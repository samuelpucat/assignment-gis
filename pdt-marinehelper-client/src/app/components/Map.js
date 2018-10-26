import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import { ZoomControl } from "react-mapbox-gl";

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
    geoJson: PropTypes.object
  },

  render() {
    console.log("Map", this.props.geoJson);

    return (
      <Mapbox
        style="mapbox://styles/zulbaijin/cjngbh3k2242n2snt2lk1345f"
        center={[16, 43]}
        zoom={[8]}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        onClick={(map, evt) => {
          console.log(evt);
        }}
        onMouseMove={(map, evt) => {
          console.log(evt);
        }}
      >
        <ZoomControl />
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
      </Mapbox>
    );
  }
});
