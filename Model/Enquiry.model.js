const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courseInterest: { type: String, required: true },
  claimedby: { type: String },
});

const EnquiryModel = mongoose.model("enquiry", EnquirySchema);

module.exports = {
  EnquiryModel,
};
