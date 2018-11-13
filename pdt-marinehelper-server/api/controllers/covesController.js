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

exports.getNearbyAnchorages = (req, res, next) => {
  const { lat, lng, maxDistance } = req.query;
  const SELECT_ANCHORAGES_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", "seamark:anchorage:category", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) AS center, " +
    "ST_Distance(ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, ST_Transform(way, 4326)) AS st_distance " +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'anchorage' AND ST_DWithin(ST_Transform(way, 4326), ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, $1::int)" +
    "ORDER BY st_distance";

  db.query(SELECT_ANCHORAGES_QUERY, [maxDistance, lng, lat], (err, res1) => {
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

exports.getNearbyMoorings = (req, res, next) => {
  const { lat, lng, maxDistance } = req.query;
  const SELECT_MOORINGS_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", "seamark:anchorage:category", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) AS center, " +
    "ST_Distance(ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, ST_Transform(way, 4326)) as st_distance " +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'mooring' AND ST_DWithin(ST_Transform(way, 4326), ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, $1::int)" +
    "ORDER BY st_distance";

  db.query(SELECT_MOORINGS_QUERY, [maxDistance, lng, lat], (err, res1) => {
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

exports.getNearbyUnderwaterCablesAndPipes = (req, res, next) => {
  const { lat, lng, maxDistance } = req.query;
  const SELECT_UNDERWATER_CABLES_AND_PIPES_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) AS geometry, " +
    "ST_Distance(ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, ST_Transform(way, 4326)) as st_distance " +
    "FROM planet_osm_line " +
    "WHERE (\"seamark:type\" = 'pipeline_submarine' OR \"seamark:type\" = 'cable_submarine') AND ST_DWithin(ST_Transform(way, 4326), ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, $1::int)" +
    "ORDER BY st_distance";

  db.query(
    SELECT_UNDERWATER_CABLES_AND_PIPES_QUERY,
    [maxDistance, lng, lat],
    (err, res1) => {
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
    }
  );
};
