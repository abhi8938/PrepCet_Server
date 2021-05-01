const winston = require("winston")

module.exports = function (err, req, res, next) {
  winston.log(err.message, err);
  console.log("ERROR", err);
  res.status(201).send(err.message);
};
