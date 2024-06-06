require("dotenv").config();
const express = require("express");
const authRouer = require("./routes/auth-route");
const app = express();

app.use(express.json());
app.use("/auth", authRouer);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Sever running on port", port);
});
