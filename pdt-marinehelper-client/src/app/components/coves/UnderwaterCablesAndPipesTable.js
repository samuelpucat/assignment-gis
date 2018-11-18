import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

export const UnderwaterCablesAndPipesTable = createReactClass({
  propTypes: {
    cablesAndPipes: PropTypes.array
  },

  render() {
    return (
      <ReactTable
        data={this.props.cablesAndPipes}
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
            Header: "st_distance [m]",
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
