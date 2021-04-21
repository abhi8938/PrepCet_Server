const winston=require('winston');

const error_supporter=function () {
  winston.handleExceptions(
    new winston.transports.Console({colorize:true,prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtExceptions.log'}));
    
    process.on('unhandledRejection',(ex)=>{
      throw ex;
    })
    
    winston.add(winston.transports.File,{filename:'logfile.log'});
}

module.exports=error_supporter;