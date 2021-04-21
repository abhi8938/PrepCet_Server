const admin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send("Forbidden Request, Not an admin!");
  next();
};

module.exports=admin;
