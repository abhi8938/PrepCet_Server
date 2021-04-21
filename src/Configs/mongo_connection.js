const mongoose=require('mongoose')
const config=require('config')

// var db = "mongodb://localhost:27017/prepuni";
// var db = "mongodb://localhost:27017/prepuni_test";
// var db ="mongodb+srv://admin_prep:waFHuMrPzPpwbjeq@prepuni.aj9c2.mongodb.net/prepuni?retryWrites=true&w=majority";
var db=config.get("db")
const connect_db = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`connected to database.... ${db}`))
    .catch((err) =>
      console.log("Connection refused to database because....", err)
    );
};

module.exports=connect_db
