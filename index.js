const express = require("express");
const cors = require("cors");
const { connection } = require("./Connection/Connection");
const { UserRouter } = require("./Routes/User.routes");
const { EnquiryRouter } = require("./Routes/Enquiry.routes");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Fastor Backend Assignment");
});

app.use("/user", UserRouter);
app.use("/employee", EnquiryRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
    console.log("Not connected to Database");
  }
  console.log("Server running on PORT 8080");
});
