require("express-async-errors");

const Extras=require("../Routes/Extras")
const Packages=require("../Routes/Packages")
const Payment=require("../Routes/Payments")
const Students=require("../Routes/Students")
const Subject=require("../Routes/subject")
const Subscriptions=require("../Routes/Subscriptions")
const Report=require("../Routes/report")
const question=require("../Routes/question")
const Doubt=require("../Routes/doubt")
const Referals=require("../Routes/referals")
const chapter=require("../Routes/chapters")
const category=require("../Routes/catergory")
const lecture=require("../Routes/lectures")
const content=require("../Routes/content")
const testpaper=require("../Routes/testpapers")
const prevpaper=require("../Routes/prevpaper")
const combo=require("../Routes/combos")
const current=require("../Routes/current")
const vocab=require("../Routes/vocab")
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
  app.use("/api/report",Report)
  app.use("/api/question",question)
  app.use("/api/doubt",Doubt)
  app.use("/api/referal",Referals)
  app.use("/api/chapter",chapter)
  app.use("/api/category",category)
  app.use("/api/lecture",lecture)
  app.use("/api/content",content)
  app.use("/api/testpaper",testpaper)
  app.use("/api/prevpaper",prevpaper)
  app.use("/api/combo",combo)
  app.use("/api/current",current)
  app.use("/api/vocab",vocab)

  app.use(error);
};

module.exports=routes
