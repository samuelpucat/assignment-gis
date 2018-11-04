const db = require("../../db");

exports.getOne = (req, res, next) => {
  const { id } = req.query;
  const SELECT_HARBOUR_QUERY =
    "WITH harbours AS (" +
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Centroid(ST_Transform(way, 4326))) as center, ST_AsGeoJSON(ST_Transform(way, 4326)) as geometry ' +
    "FROM planet_osm_polygon " +
    "WHERE \"seamark:type\" = 'harbour' AND osm_id = $1" +
    "UNION " +
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Transform(way, 4326)) as center, ST_AsGeoJSON(ST_Transform(way, 4326)) as geometry ' +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'harbour' AND osm_id = $1" +
    ") " +
    "SELECT * FROM harbours";

  db.query(SELECT_HARBOUR_QUERY, [id], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geometry = JSON.parse(row.geometry);
      const center = JSON.parse(row.center);
      return { ...row, geometry, center };
    });

    res.status(200).json({
      message: "harbour fetched",
      result: result,
      error: err
    });
  });
};

exports.getAll = (req, res, next) => {
  const SELECT_HARBOURS_QUERY =
    "WITH harbours AS (" +
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Centroid(ST_Transform(way, 4326))) as center ' +
    "FROM planet_osm_polygon " +
    "WHERE \"seamark:type\" = 'harbour' " +
    "UNION " +
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Transform(way, 4326)) as center ' +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'harbour' " +
    ") " +
    "SELECT * FROM harbours";

  db.query(SELECT_HARBOURS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const center = JSON.parse(row.center);
      return { ...row, center };
    });

    res.status(200).json({
      message: "harbours fetched",
      result: result,
      error: err
    });
  });
};
