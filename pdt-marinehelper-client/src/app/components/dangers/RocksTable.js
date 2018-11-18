import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const RocksTable = createReactClass({
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
            Header: "seamark:rock:water_level",
            accessor: "seamark:rock:water_level"
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
