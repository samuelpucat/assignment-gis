import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const LightsTable = createReactClass({
  propTypes: {
    dangers: PropTypes.array
  },

  render() {
    return (
      <ReactTable
        data={this.props.dangers}
        columns={[
          {
            Header: "osm_id",
            accessor: "osm_id"
          },
          {
            Header: "seamark:type",
            accessor: "seamark:type"
          },
          {
            Header: "seamark:name",
            accessor: "seamark:name"
          },
          {
            Header: "seamark:light:category",
            accessor: "seamark:light:category"
          },
          {
            Header: "seamark:light:exhibition",
            accessor: "seamark:light:exhibition"
          },
          {
            Header: "seamark:light:colour",
            accessor: "seamark:light:colour"
          },
          {
            Header: "seamark:light:group",
            accessor: "seamark:light:group"
          },
          {
            Header: "seamark:light:height",
            accessor: "seamark:light:height"
          },
          {
            Header: "seamark:light:period",
            accessor: "seamark:light:period"
          },
          {
            Header: "seamark:light:range",
            accessor: "seamark:light:range"
          },
          {
            Header: "seamark:light:multiple",
            accessor: "seamark:light:multiple"
          },
          {
            Header: "seamark:light:sector_start",
            accessor: "seamark:light:sector_start"
          },
          {
            Header: "seamark:light:sector_end",
            accessor: "seamark:light:sector_end"
          },
          {
            Header: "seamark:light:visibility",
            accessor: "seamark:light:visibility"
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
