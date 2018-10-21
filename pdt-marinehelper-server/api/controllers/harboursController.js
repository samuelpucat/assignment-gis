const db = require("../../db");

exports.getOne = (req, res, next) => {
  const { id } = req.query;
  const SELECT_HARBOUR_QUERY = 'select "seamark:type",  "seamark:harbour:category", ST_AsGeoJSON(ST_Transform(way, 4326)) as way ' +
  "from planet_osm_polygon " +
  "where \"seamark:type\" = 'harbour' and osm_id = $1";

  db.query(
    SELECT_HARBOUR_QUERY,
    [id],
    (err, res1) => {
      if (err) {
        return next(err);
      }

      const result = res1.rows.map(row => {
        const way = JSON.parse(row.way);
        return { ...row, way };
      });

      res.status(200).json({
        message: "harbour fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getAll = (req, res, next) => {
  db.query(
    'select "seamark:type",  "seamark:harbour:category", ST_AsGeoJSON(ST_Transform(way, 4326)) as way ' +
      "from planet_osm_polygon " +
      "where \"seamark:type\" = 'harbour'",
    [],
    (err, res1) => {
      if (err) {
        return next(err);
      }

      const result = res1.rows.map(row => {
        const way = JSON.parse(row.way);
        return { ...row, way };
      });

      res.status(200).json({
        message: "harbours fetched",
        result: result,
        error: err
      });
    }
  );
};
