import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const HarboursTable = createReactClass({
  propTypes: {
    harbours: PropTypes.array
  },

  render() {
    return (
      <ReactTable
        data={this.props.harbours}
        columns={[
          {
            Header: "osm_id",
            accessor: "osm_id"
          },
          {
            Header: "name",
            accessor: "name"
          },
          {
            Header: "seamark:name",
            accessor: "seamark:name"
          },
          {
            Header: "seamark:harbour:category",
            accessor: "seamark:harbour:category"
          },
          {
            Header: "harbourfacilities",
            accessor: "harbourfacilities"
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
