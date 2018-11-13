const db = require("../../db");

/*
input:
{
  geojson
  buffer
}
*/

exports.getIsolatedDangers = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };

  const SELECT_ISOLATED_DANGERS_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    '"seamark:light:height", "seamark:light:colour", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" like '%_isolated_danger' AND " +
    "ST_Intersects(" +
    "ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1), " +
    "ST_Transform(way, 4326)" +
    ")";

  db.query(
    SELECT_ISOLATED_DANGERS_QUERY,
    [queryParams.buffer, queryParams.geojson],
    (err, res1) => {
      if (err) {
        return next(err);
      }

      const result = res1.rows.map(row => {
        const center = JSON.parse(row.center);
        return { ...row, center };
      });

      res.status(200).json({
        message: "isolated dangers fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getLateralSigns = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_LATERAL_SIGNS_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    '"seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" like '%_lateral' AND " +
    "ST_Intersects(" +
    "ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1), " +
    "ST_Transform(way, 4326)" +
    ")";

  db.query(
    SELECT_LATERAL_SIGNS_QUERY,
    [queryParams.buffer, queryParams.geojson],
    (err, res1) => {
      if (err) {
        return next(err);
      }

      const result = res1.rows.map(row => {
        const center = JSON.parse(row.center);
        return { ...row, center };
      });

      res.status(200).json({
        message: "lateral signs fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getCardinalSigns = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_CARDINAL_SIGNS_QUERY = 
  'SELECT osm_id, "seamark:type", "seamark:name", "seamark:buoy_cardinal:category", ' +
    '"seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" like '%_cardinal' AND " +
    "ST_Intersects(" +
    "ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1), " +
    "ST_Transform(way, 4326)" +
    ")";

  db.query(SELECT_CARDINAL_SIGNS_QUERY, [queryParams.buffer, queryParams.geojson], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const center = JSON.parse(row.center);
      return { ...row, center };
    });

    res.status(200).json({
      message: "cardinal signs fetched",
      result: result,
      error: err
    });
  });
};

exports.getRocks = (req, res, next) => {
  const queryParams = {
    lineString: req.body.lineString
  };
  let SELECT_DANGERS_QUERY = "";

  db.query(SELECT_DANGERS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "dangers fetched",
      result: result,
      error: err
    });
  });
};

exports.getWrecks = (req, res, next) => {
  const queryParams = {
    lineString: req.body.lineString
  };
  let SELECT_DANGERS_QUERY = "";

  db.query(SELECT_DANGERS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "dangers fetched",
      result: result,
      error: err
    });
  });
};

exports.getSpecialPurposeSigns = (req, res, next) => {
  const queryParams = {
    lineString: req.body.lineString
  };
  let SELECT_DANGERS_QUERY = "";

  db.query(SELECT_DANGERS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "dangers fetched",
      result: result,
      error: err
    });
  });
};

exports.getLights = (req, res, next) => {
  const queryParams = {
    lineString: req.body.lineString
  };
  let SELECT_DANGERS_QUERY = "";

  db.query(SELECT_DANGERS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "dangers fetched",
      result: result,
      error: err
    });
  });
};

exports.getCoastLines = (req, res, next) => {
  const queryParams = {
    lineString: req.body.lineString
  };
  let SELECT_DANGERS_QUERY = "";

  db.query(SELECT_DANGERS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "dangers fetched",
      result: result,
      error: err
    });
  });
};
