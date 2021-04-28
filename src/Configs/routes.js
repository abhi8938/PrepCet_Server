require("express-async-errors");

const Extras=require("../Routes/Extras")
const Packages=require("../Routes/Packages")
const Payment=require("../Routes/Payments")
const Students=require("../Routes/Students")
const Subject=require("../Routes/subject")
const Subscriptions=require("../Routes/Subscriptions")
const Post=require("../Routes/posts")
const Report=require("../Routes/report")
const question=require("../Routes/question")
const asyncMiddleware=require("../Middlewares/async")
const error=require("../Middlewares/error")
const winston=require("winston")

const routes = (app) => {
  app.use("/api/students", Students);    //done
  app.use("/api/subscriptions", Subscriptions); 
  app.use("/api/extras", Extras);
  app.use("/api/packages", Packages);  //done
  app.use("/api/payment", Payment);
  app.use("/api/subject",Subject);
  app.use("/api/post",Post)
  app.use("/api/report",Report)
  app.use("/api/question",question)

  app.use(error);
};

module.exports=routes
