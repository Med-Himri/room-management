const User = require("../models/User"); 
//const sendEmail = require("../utils/mail2");
//const generateOTP = require("../utils/generateOTP");
const Otp = require("../models/otp"); // your OTP mongoose model

const bcrypt = require("bcrypt");

const registerUser = async (name, email, password, phoneNumber) => {
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   throw new Error("The email is already in use.");
  // }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,  
    phoneNumber,
    password: hashedPassword,
    emailVerified: false,
  });
  await newUser.save();
  return newUser;

};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   throw new Error("The email or password is incorrect.");
  // }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
