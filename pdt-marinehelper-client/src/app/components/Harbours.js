import React from "react";
import axios from "axios";

export class Harbours extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:3001/harbours/getHarbour?id=244608718")
      .then(res => {
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <h2>Harbours</h2>
      </div>
    );
  }
}
