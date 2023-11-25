const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    //validating token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //verifying token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Something Went wrong while validating token",
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Protected Route Access Denied",
      });
    }
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Incorrect User Role. Access Denied",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "Protected Route Access Denied",
      });
    }
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Incorrect User Role. Access Denied",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protected Route Access Denied",
      });
    }
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Incorrect User Role. Access Denied",
    });
  }
};
