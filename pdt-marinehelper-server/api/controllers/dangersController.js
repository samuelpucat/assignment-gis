const db = require("../../db");

exports.getDangers = (req, res, next) => {
  const queryParams = {
    lineString: req.body.lineString,
    isolatedDangers: req.body.isolatedDangers,
    beacons: req.body.beacons,
    rocks: req.body.rocks,
    buoys: req.body.buoys,
    wrecks: req.body.wrecks,
    cardinalSigns: req.body.cardinalSigns,
    specialPurposeSigns: req.body.specialPurposeSigns,
    lights: req.body.lights,
    coastLines: req.body.coastLines
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
