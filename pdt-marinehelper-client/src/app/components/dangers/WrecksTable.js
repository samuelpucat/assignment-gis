import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const WrecksTable = createReactClass({
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
            Header: "seamark:wreck:category",
            accessor: "seamark:wreck:category"
          },
          {
            Header: "sport",
            accessor: "sport"
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
