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
    "WITH buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    ' "seamark:light:height", "seamark:light:colour", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    " ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point, buffer bu " +
    "WHERE \"seamark:type\" like '%_isolated_danger' AND ST_Intersects(bu.buffer, way)";

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
    "WITH buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    ' "seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    " ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point, buffer bu " +
    "WHERE \"seamark:type\" like '%_lateral' AND ST_Intersects(bu.buffer, way)";

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
    "WITH buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id, "seamark:type", "seamark:name", "seamark:buoy_cardinal:category", ' +
    ' "seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    " ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point, buffer bu " +
    "WHERE \"seamark:type\" like '%_cardinal' AND " +
    "ST_Intersects(bu.buffer, way)";

  db.query(
    SELECT_CARDINAL_SIGNS_QUERY,
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
        message: "cardinal signs fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getSpecialPurposeSigns = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_SPECIAL_PURPOSE_SIGNS_QUERY =
    "WITH buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id, "seamark:type", "seamark:name", "seamark:buoy_cardinal:category", ' +
    ' "seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    " ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point, buffer bu " +
    "WHERE \"seamark:type\" like '%_special_purpose' AND " +
    "ST_Intersects(bu.buffer, way)";

  db.query(
    SELECT_SPECIAL_PURPOSE_SIGNS_QUERY,
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
        message: "special purpose signs fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getLights = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_LIGHTS_QUERY =
    "WITH buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id, "seamark:type", "seamark:name", ' +
    ' "seamark:light:height", "seamark:light:colour", "seamark:light:multiple", "seamark:light:range", "seamark:light:group", "seamark:light:period", ' +
    ' "seamark:light:sector_start", "seamark:light:sector_end", "seamark:light:category", "seamark:light:visibility", "seamark:light:exhibition", ' +
    " ST_AsGeoJSON(ST_Transform(way, 4326)) as center " +
    "FROM planet_osm_point, buffer bu " +
    "WHERE \"seamark:type\" like 'light_%' AND " +
    "ST_Intersects(bu.buffer, way)";

  db.query(
    SELECT_LIGHTS_QUERY,
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
        message: "lights fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getRocks = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_LIGHTS_QUERY =
    "WITH rocks AS (" +
    ' SELECT osm_id, "seamark:type", "seamark:name", "seamark:rock:water_level", ' +
    " ST_AsGeoJSON(ST_Transform(way, 4326)) as center, way " +
    " FROM planet_osm_point " +
    " WHERE \"seamark:type\" = 'rock'" +
    "UNION " +
    ' SELECT osm_id, "seamark:type", "seamark:name", "seamark:rock:water_level", ' +
    " ST_AsGeoJSON(ST_Transform(ST_Centroid(way), 4326)) as center, way " +
    " FROM planet_osm_point " +
    " WHERE \"seamark:type\" = 'rock'" +
    "), buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id, "seamark:type", "seamark:name", "seamark:rock:water_level", center ' +
    "FROM rocks, buffer bu " +
    "WHERE ST_Intersects(bu.buffer, way)";

  db.query(
    SELECT_LIGHTS_QUERY,
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
        message: "rocks fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getWrecks = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_WRECKS_QUERY =
    "WITH buffer AS ( "+
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer "+
    ") "+
    'SELECT osm_id,  name, "seamark:type", "seamark:name", "seamark:wreck:category", "sport", ST_AsGeoJSON(ST_Transform(way, 4326)) as center ' +
    "FROM planet_osm_point, buffer bu " +
    "WHERE \"seamark:type\" = 'wreck' AND ST_Intersects(bu.buffer, way)";

  db.query(
    SELECT_WRECKS_QUERY,
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
        message: "wrecks fetched",
        result: result,
        error: err
      });
    }
  );
};

exports.getCoastLines = (req, res, next) => {
  const queryParams = {
    geojson: JSON.stringify(req.body.geojson),
    buffer: req.body.buffer
  };
  let SELECT_COAST_LINES_QUERY =
    "WITH coastlines AS (" +
    ' SELECT osm_id, "natural", way ' +
    " FROM planet_osm_line " +
    " WHERE \"natural\" = 'coastline' " +
    "UNION " +
    ' SELECT osm_id, "natural", way ' +
    " FROM planet_osm_polygon " +
    " WHERE \"natural\" = 'coastline' " +
    "), buffer AS (" +
    " SELECT ST_Transform(ST_Buffer(ST_GeomFromGeoJSON($2)::geography, $1)::geometry, 3857) AS buffer" +
    ")" +
    'SELECT cl.osm_id, cl."natural", ST_AsGeoJSON(ST_Transform(ST_Intersection(cl.way, bu.buffer), 4326)) as geometry ' +
    "FROM coastlines AS cl, buffer AS bu " +
    "WHERE ST_Intersects(cl.way, bu.buffer)"

  db.query(
    SELECT_COAST_LINES_QUERY,
    [queryParams.buffer, queryParams.geojson],
    (err, res1) => {
      if (err) {
        return next(err);
      }

      const result = res1.rows.map(row => {
        const geometry = JSON.parse(row.geometry);
        return { ...row, geometry };
      });

      res.status(200).json({
        message: "coast lines fetched",
        result: result,
        error: err
      });
    }
  );
};
