const jwt = require("jsonwebtoken");
const HttpError = require("../ErrorModel/errorModel");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      const error = new HttpError(
        "Authentication failed, something wrong",
        401
      );
      return next(error);
    }

    const decodedToken = jwt.verify(token, process.env.Secret_key);
    req.userId = { userId: decodedToken.userId };
    req.user = await User.findById(decodedToken.userId).select('-password');
    next();

  } catch (err) {
    console.log(err);
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};

const admin = (req, res, next) =>{
    if(req.userId && req.user.isAdmin){
      console.log(req.user.isAdmin);
      next();
    }else{
      const error = new HttpError("Admin Authentication failed", 403);
      return next(error);
    }
}

module.exports = {
  auth, admin
}
