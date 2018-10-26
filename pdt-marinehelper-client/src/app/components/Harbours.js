import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import axios from "axios";
import {Map} from "./Map";

export const Harbours = createReactClass ({
  propTypes: {
    geoJson: PropTypes.object
  },

  getInitialState() {
    let parsedUrl = new URL(window.location.href);
    const p = parsedUrl.searchParams.get("p")
    console.log(p);
    return {
      p
    };
  },
  
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
  },

  render() {
    return (
      <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
        <h2>Harbours{this.state.p}</h2>
        <Map geoJson={this.state.geoJson}/>
      </div>
    );
  }
});
