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
    return (
      <ReactTable
        data={this.props.anchorages}
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
            Header: "st_distance",
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
