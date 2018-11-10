const db = require("../../db");

/*
input:
{
  points: [[16, 43], [16.5, 43]],
  buffer
}
*/

function getLineString(points) {
  return `'SRID=4326; LINESTRING(${points
    .map(point => point.join(" "))
    .join(", ")})'`;
}

exports.getIsolatedDangers = (req, res, next) => {
  const queryParams = {
    points: req.body.points,
    buffer: req.body.buffer
  };
  const lineString = getLineString(queryParams.points);
  const SELECT_ISOLATED_DANGERS_QUERY =
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    '"seamark:light:height", "seamark:light:colour", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    "ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" like '%_isolated_danger' AND " +
    "ST_Intersects(" +
    `ST_Buffer(ST_GeographyFromText(${lineString}), $1), ` +
    "ST_Transform(way, 4326)" +
    ")";

  db.query(SELECT_ISOLATED_DANGERS_QUERY, [queryParams.buffer], (err, res1) => {
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
  });
};

exports.getBeacons = (req, res, next) => {
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

exports.getBuoys = (req, res, next) => {
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

exports.getCardinalSigns = (req, res, next) => {
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
