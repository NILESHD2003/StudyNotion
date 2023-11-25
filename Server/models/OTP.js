const mon = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mon.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  description: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60 * 1000,
  },
});

async function sendVerificationMail(email, otp){
  try{
    const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
    console.log(mailResponse);
  }catch(e){
    console.error(e)
  }
}

otpSchema.pre("save", async function(next){
  await sendVerificationMail(this.email, this.otp);
  next();
})

module.exports = mon.model("OTP", otpSchema);
