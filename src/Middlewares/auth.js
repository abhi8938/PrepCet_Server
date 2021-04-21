const config=require("config")
const jwt=require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(201).send("Access denied. No token given.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(201).send("Invalid token. Login Again!");
  }
};

module.exports=auth;