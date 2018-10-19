import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoienVsYmFpamluIiwiYSI6ImNqbmdhZmk0YjAxNWEzcXFycHdhOThoMWsifQ.VvGH0r6toaDMxIRXcwm_SQ"
});

export class Map extends React.Component {
  render() {
    return (
      <Mapbox
        style="mapbox://styles/zulbaijin/cjngbh3k2242n2snt2lk1345f"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Mapbox>
    );
  }
}
