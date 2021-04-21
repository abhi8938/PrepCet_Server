require("express-async-errors");

const Extras=require("../Routes/Extras")
const Packages=require("../Routes/Packages")
const Payment=require("../Routes/Payments")
const Students=require("../Routes/Students")
const Subscriptions=require("../Routes/Subscriptions")
const asyncMiddleware=require("../Middlewares/async")
const error=require("../Middlewares/error")
const winston=require("winston")

const routes = (app) => {
  app.use("/api/students", Students);    //done
  app.use("/api/subscriptions", Subscriptions); 
  app.use("/api/extras", Extras);
  app.use("/api/packages", Packages);  //done
  app.use("/api/payment", Payment);

  app.use(error);
};

module.exports=routes
