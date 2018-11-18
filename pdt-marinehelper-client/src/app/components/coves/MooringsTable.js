import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const MooringsTable = createReactClass({
  propTypes: {
    moorings: PropTypes.array
  },

  render() {
    return (
      <ReactTable
        data={this.props.moorings}
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
            Header: "st_distance",
            accessor: "st_distance"
          },
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
