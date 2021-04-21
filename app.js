const bodyParser=require("body-parser");
const config=require("config");
const config_support=require("./src/Configs/config")
const connect_db =require("./src/Configs/mongo_connection");
const cors =require('cors')
const {dirname} =require("path")
const ejs=require("ejs")
const error_supporter=require("./src/Configs/logging")
const express=require("express");
const {fileURLToPath}=require("url")
const redirect =require('express-redirect')
const routes=require('./src/Configs/routes')
const winston=require('winston')

error_supporter();
config_support();

// Final JS
const app = express();
redirect(app);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.engine("html", ejs.renderFile);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect_db();
routes(app);

const port = process.env.PORT || 3001;
const server=app.listen(port, () => winston.info("Listening On " + port));

module.exports=server
