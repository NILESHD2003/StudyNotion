const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//send otp
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    //check if user exits
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already Registered",
      });
    }
    //generate OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //check otp uniqueness...
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    console.log("OPT is: ", otp);

    //otp payload
    const otpPayLoad = { email, otp };

    const otpBody = await OTP.create(otpPayLoad);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP sent Succesfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All feilds are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered",
      });
    }
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    //OTP validation
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      contactNumber: contactNumber,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      message: "User Registration Successful",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Unable to register User. Try again later.",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Data Validation
    if (!email || !password) {
      return req.status(403).json({
        success: false,
        message: "Incomplete Details",
      });
    }
    //check user in DB
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered please Signup",
      });
    }
    //creating payload
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    //match answers by decrypting
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      //creating cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Problem while logging In. Try again later.",
    });
  }
};

//changePassword: Homework
exports.changePassword = async (req, res) => {
    try{

    }catch(e){

    }
}