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

/*
buffer: 100
facilities: ["toilets", "showers", "electricity", "fuel_station", "chandler", "laundrette", "boatyard", "slipway", "boat_hoist", "visitor_berth"]
*/
exports.getAllWithFacilities = (req, res, next) => {
  const queryParams = {
    buffer: req.body.buffer,
    facilities: req.body.facilities
  };

  let facilities = queryParams.facilities.map(f => `%${f}%`);

  console.log(facilities);

  const SELECT_HARBOURS_QUERY =
    "WITH harbour_with_facilities AS (" +
    " WITH harbours AS (" +
    '  SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_Transform(ST_Buffer(ST_Transform(way, 4326)::geography, $1)::geometry, 3857) AS way ' +
    "  FROM planet_osm_polygon " +
    "  WHERE \"seamark:type\" = 'harbour' " +
    "  UNION " +
    '  SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_Transform(ST_Buffer(ST_Transform(way, 4326)::geography, $1)::geometry, 3857) AS way ' +
    "  FROM planet_osm_point " +
    "  WHERE \"seamark:type\" = 'harbour' " +
    " ), facilities AS (" +
    '  SELECT osm_id, "seamark:type", "seamark:small_craft_facility:category", way ' +
    "  FROM planet_osm_point " +
    "  WHERE \"seamark:type\" = 'small_craft_facility' " +
    "  UNION " +
    '  SELECT osm_id, "seamark:type", "seamark:small_craft_facility:category", way ' +
    "  FROM planet_osm_line " +
    "  WHERE \"seamark:type\" = 'small_craft_facility' " +
    "  UNION " +
    '  SELECT osm_id, "seamark:type", "seamark:small_craft_facility:category", way ' +
    "  FROM planet_osm_polygon " +
    "  WHERE \"seamark:type\" = 'small_craft_facility' " +
    " )" +
    ' SELECT h."osm_id", h."seamark:type", h."seamark:name", h."seamark:harbour:category", h."name", h.way, string_agg(distinct "seamark:small_craft_facility:category", \';\') AS harbourFacilities ' +
    " FROM harbours AS h " +
    " CROSS JOIN facilities AS f " +
    " WHERE (" +
    "  ST_Contains(h.way, f.way) AND " +
    "  f.\"seamark:small_craft_facility:category\" SIMILAR TO '%(toilets|showers|electricity|fuel_station|chandler|laundrette|boatyard|slipway|boat_hoist|visitor_berth)%' " +
    " )" +
    ' GROUP BY h."osm_id", h."seamark:type", h."seamark:name", h."seamark:harbour:category", h."name", h.way ' +
    ")" +
    'SELECT "osm_id", "seamark:type", "seamark:name", "seamark:harbour:category", "name", ST_AsGeoJSON(ST_Transform(ST_Centroid(way), 4326)) AS center, harbourFacilities ' +
    "FROM harbour_with_facilities " +
    "WHERE harbourFacilities LIKE all($2::text[])";

  db.query(
    SELECT_HARBOURS_QUERY,
    [queryParams.buffer, facilities],
    (err, res1) => {
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
    }
  );
};
