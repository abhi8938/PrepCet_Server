const config=require('config')

const config_support=function () {
    if (!config.get("jwtPrivateKey")) {
        throw new Error("Fatal Error: jwtPrivate key is no defined");
      }
  }

module.exports=config_support;