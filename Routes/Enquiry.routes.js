const { Router } = require("express");
const { EnquiryModel } = require("../Model/Enquiry.model");
const { authentication } = require("../Middleware/Authentication");

const EnquiryRouter = Router();

//  Public form API must be accessible without any authentication.

EnquiryRouter.post("/enquiry", async (req, res) => {
  const { name, email, courseInterest } = req.body;

  try {
    const newEnquiry = await new EnquiryModel({
      name,
      email,
      courseInterest,
      claimedby: null,
    });
    await newEnquiry.save();
    res.status(201).send("Enquiry Submitted");
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to claim leads.
EnquiryRouter.patch("/:id/claim", authentication, async (req, res) => {
  const { id } = req.params;
  const { employeeId } = req.body;

  const enquiry = await EnquiryModel.findByIdAndUpdate(
    { _id: id },
    {
      claimedby: employeeId,
    }
  );

  if (!enquiry) {
    res.status(500).send("Not able to Claimed");
  } else {
    res.status(201).send("Claimed");
  }
});

// API to fetch unclaimed leads.
EnquiryRouter.get("/unclaim", async (req, res) => {
  try {
    const unclaimed = await EnquiryModel.find({ claimedby: null });
    res.status(200).send({ message: "Unclaimed Leads", unclaimed });
  } catch (err) {
    res.status(500).send(err);
  }
});

// API to fetch leads claimed by logged in users.
EnquiryRouter.get("/:id/Allclaim", authentication, async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const enquiry = await EnquiryModel.find({ claimedby: employeeId });
    res.status(200).send({ message: "All CLaimed Lead", enquiry });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  EnquiryRouter,
};
