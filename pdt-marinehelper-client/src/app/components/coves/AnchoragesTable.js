import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const AnchoragesTable = createReactClass({
  propTypes: {
    anchorages: PropTypes.array
  },

  render() {
    let anchorages = this.props.anchorages.map(a => {
      return {...a, st_distance: a.st_distance.toFixed(2)}
    });
    return (
      <ReactTable
        data={anchorages}
        columns={[
          {
            Header: "osm_id",
            accessor: "osm_id"
          },
          {
            Header: "seamark:name",
            accessor: "seamark:name"
          },
          {
            Header: "seamark:anchorage:category",
            accessor: "seamark:anchorage:category"
          },
          {
            Header: "st_distance [m]",
            accessor: "st_distance"
          }
        ]}
        className="-striped -highlight"
        style={{
          height: "100%"
        }}
        minRows = {0}
      />
    );
  }
});
