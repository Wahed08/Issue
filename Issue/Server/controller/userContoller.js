const User = require("../models/userModel");
const HttpError = require("../ErrorModel/errorModel");
const bcrypt = require("bcryptjs");

//user SignUp
const SignUp = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  //pasword match
  if (password !== confirmPassword) {
    const error = new HttpError(
      "Password does not match, please try again",
      423
    );
    return next(error);
  }

  // check existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed, Please try again", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User already exists, try new one", 422);
    return next(error);
  }

  //hashing password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }

  //create user
  const createUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  //save to db
  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failes, please try again", 501);
    return next(error);
  }

  res.status(201).json({ message: "Sign up Succesful" });
};

module.exports = {
  SignUp,
};
