const User = require("../models/userModel");
const Verification = require("../models/userVerification");
const {generateOTP, mailTransPort} = require("../utils/helper");
const HttpError = require("../ErrorModel/errorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//user SignUp
const SignUp = async (req, res, next) => {
  
  const regEx = /^([a-z\d\.-]+)@([a-z\d-]+)\.(sust)\.(edu)$/g;
  const { name, email, password, confirmPassword, verified} = req.body;

  //email validation check
  if (!regEx.test(email)) {
    const error = new HttpError("You should provide proper university email", 402);
    return next(error);
  }

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
    verified
  });

  const OTP = generateOTP();
  const verificationUser = new Verification({
    userId : createUser._id,
    token: OTP
  });
  
  //save to db
  try {
    await verificationUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 501);
    return next(error);
  }

  try {
    await createUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 501);
    return next(error);
  }

  //
  mailTransPort().sendMail({
    from: "no-reply@verification.com",
    to: createUser.email,
    subject: "Please verify your Email",
    html: `<h1>Your OTP is ${OTP}</h1>`
  });

  res.status(201).json({ message: "Sign up Successful", user:createUser });
};



//verify email
const verifyEmail = async (req, res, next) =>{
  const {otp} = req.body;
  const userId = req.params.uid;

  if(!userId || !otp.trim()){
    const error = new HttpError("Invalid parameters", 402);
    return next(error);
  }

  let verifyUser;
  try{
    verifyUser = await User.findById(userId);
  }catch(err){
    const error = new HttpError("Invalid credentials", 500);
    return next(error);
  }

  if (!verifyUser) {
    const error = new HttpError(
      "Invalid credentials, user not found",
      401
    );
    return next(error);
  }

  if(verifyUser.verified){
      const error = new HttpError(
        "This account is already verified",
        401
      );
      return next(error);
  }

  const token = await Verification.findOne({userId: verifyUser._id});
  if(!token){
    const error = new HttpError("Invalid! sorry user not found", 402);
    return next(error);
  }

  const isMatched = await token.compareToken(otp);
  if(!isMatched){
    const error = new HttpError("please provide a valid otp", 401);
    return next(error);
  }

  verifyUser.verified = true;
  await Verification.findByIdAndDelete(token._id);
  await verifyUser.save();

  // json web token

  let jwtToken;
  try {
    jwtToken = jwt.sign(
      { userId: verifyUser.id, email: verifyUser.email },
      process.env.Secret_Key
    );
  } catch (err) {
    const error = new HttpError("verification failed, please try again", 500);
    return next(error);
  }

  //

  mailTransPort().sendMail({
    from: "no-reply@verification.com",
    to: verifyUser.email,
    subject: "Eamil Verification",
    html: `<h1>Your email is verified Succesfully</h1>`
  });

  res
  .status(201)
  .json({ message: "Email verified", userId: verifyUser.id, email: verifyUser.email, token: jwtToken });
}



//log in
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  //password compare
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid Credentials, could not log you in",
      401
    );
    return next(error);
  }

  //token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.Secret_Key
    );
  } catch (err) {
    const error = new HttpError("logging in failed, please try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};

module.exports = {
  SignUp,
  verifyEmail,
  logIn,
};
