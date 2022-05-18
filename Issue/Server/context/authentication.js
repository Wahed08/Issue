const jwt = require("jsonwebtoken");
const HttpError = require("../ErrorModel/errorModel");

module.exports = (req, res, next) => {
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
    next();

  } catch (err) {
    console.log(err);
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
