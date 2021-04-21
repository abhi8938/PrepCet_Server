const winston = require("winston")

const error = function (err, req, res, next) {
  winston.log(err.message, err);
  console.log("ERROR", err);
  res.status(201).send(err.message);
};

module.exports=error;
