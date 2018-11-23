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
    let moorings = this.props.moorings.map(m => {
      return {...m, st_distance: m.st_distance.toFixed(2)}
    });
    return (
      <ReactTable
        data={moorings}
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
