const mongoose = require('mongoose');

// Define OTP schema
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires:300
}
});
const Otp = mongoose.model('savedotp', otpSchema);

module.exports = Otp;
