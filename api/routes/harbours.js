const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  db.query(
    'select "seamark:type",  "seamark:harbour:category" ' +
      "from planet_osm_polygon " +
      "where \"seamark:type\" = 'harbour' and osm_id = $1",
    [id],
    (err, res1) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        message: "harbour fetched",
        result: res1.rows,
        error: err
      });
    }
  );
});

router.get("/", (req, res, next) => {
  db.query(
    'select "seamark:type",  "seamark:harbour:category" from planet_osm_polygon where "seamark:type" = \'harbour\'',
    [],
    (err, res2) => {
      res.status(200).json({
        message: "harbours fetched",
        result: res2.rows,
        error: err
      });
    }
  );
});

module.exports = router;
