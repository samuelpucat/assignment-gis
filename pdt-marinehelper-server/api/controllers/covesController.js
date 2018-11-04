const db = require("../../db");

exports.getAllAnchorages = (req, res, next) => {
  const SELECT_ANCHORAGES_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", "seamark:anchorage:category", ST_AsGeoJSON(ST_Transform(way, 4326)) AS center ' +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'anchorage'";

  db.query(SELECT_ANCHORAGES_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const center = JSON.parse(row.center);
      return { ...row, center };
    });

    res.status(200).json({
      message: "anchorages fetched",
      result: result,
      error: err
    });
  });
};

exports.getAllMoorings = (req, res, next) => {
  const SELECT_MOORINGS_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", ST_AsGeoJSON(ST_Transform(way, 4326)) as center ' +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'mooring'";

  db.query(SELECT_MOORINGS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const center = JSON.parse(row.center);
      return { ...row, center };
    });

    res.status(200).json({
      message: "moorings fetched",
      result: result,
      error: err
    });
  });
};

exports.getAllRestrictedAreas = (req, res, next) => {
  const SELECT_RESTRICTED_AREAS_QUERY = "";

  db.query(SELECT_RESTRICTED_AREAS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "restricted areas fetched",
      result: result,
      error: err
    });
  });
};

exports.getAllUnderwaterCablesAndPipes = (req, res, next) => {
  const SELECT_UNDERWATER_CABLES_AND_PIPES_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", ST_AsGeoJSON(ST_Transform(way, 4326)) as geometry ' +
    "FROM planet_osm_line " +
    "WHERE \"seamark:type\" = 'pipeline_submarine' OR \"seamark:type\" = 'cable_submarine'";

  db.query(SELECT_UNDERWATER_CABLES_AND_PIPES_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geometry = JSON.parse(row.geometry);
      return { ...row, geometry };
    });

    res.status(200).json({
      message: "underwater cables and pipes fetched",
      result: result,
      error: err
    });
  });
};
