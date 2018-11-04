const db = require("../../db");

exports.getOne = (req, res, next) => {
  const { id } = req.query;
  const SELECT_HARBOUR_QUERY =
    'select "seamark:type",  "seamark:harbour:category", ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson ' +
    "from planet_osm_polygon " +
    "where \"seamark:type\" = 'harbour' and osm_id = $1";

  db.query(SELECT_HARBOUR_QUERY, [id], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
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
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Centroid(ST_Transform(way, 4326))) as geojson ' +
    "FROM planet_osm_polygon " +
    "WHERE \"seamark:type\" = 'harbour' " +
    "UNION " +
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson ' +
    "FROM planet_osm_point " +
    "WHERE \"seamark:type\" = 'harbour' " +
    ") " +
    "SELECT * FROM harbours";

  db.query(SELECT_HARBOURS_QUERY, [], (err, res1) => {
    if (err) {
      return next(err);
    }

    const result = res1.rows.map(row => {
      const geojson = JSON.parse(row.geojson);
      return { ...row, geojson };
    });

    res.status(200).json({
      message: "harbours fetched",
      result: result,
      error: err
    });
  });
};
