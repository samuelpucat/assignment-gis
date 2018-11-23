import React from "react";
import { Grid, Col } from "react-bootstrap";

export class About extends React.Component {
  render() {
    return (
      <Grid fluid={true}>
        <Col xs={12}>
          <h2>About</h2>
          <a href="https://github.com/samuelpucat/assignment-gis/blob/master/documentation.md">{"https://github.com/samuelpucat/assignment-gis/blob/master/documentation.md"}</a>
        </Col>
      </Grid>
    );
  }
}
