import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Map} from "./Map";

export class Harbours extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get("http://localhost:3001/harbours/getHarbour?id=244608718")
      .then(res => {
        this.setState({
          geoJson: res.data.result[0].way
        });
        console.log(res.data.result[0]);
      })
      .catch(err=>{
        console.log(err);
      })
  }

  render() {
    return (
      <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
        <h2>Harbours</h2>
        <Map geoJson={this.state.geoJson}/>
      </div>
    );
  }
}

Harbours.propTypes = {
  geoJson: PropTypes.object
}