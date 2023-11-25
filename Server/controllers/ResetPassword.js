const User = require("../models/User");
const mailSender = require("../utils/mailSender");

// Reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    //validate email and check if user
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "No Account registered with this email",
      });
    }
    //generate token
    const token = crypto.randomUUID();
    //adding token and expiry time to user
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: 5 * 60 * 1000,
      },
      { new: true }
    );

    //   new url
    const url = `http://localhost:3000/update-password/${token}`;
    //sending mail
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link ${url}`
    );

    res.status(200).json({
      success: true,
      message: "Password Reset Mail Sent",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending password reset mail",
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    //validate Data
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password Mismatch",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token Invalid",
      });
    }
    //Checking whether time is expired
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Request Timeout. Retry Password Reset",
      });
    }

    //Hasing new password to store in DB
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password Reset Successful. Try logging in",
    });
  } catch (e) {
    return res.status(500).json({
        success: true,
        message: "Something went wrong while resetting the password",
      });
  }
};
