require("dotenv").config();
const express = require("express");
const authRouer = require("./routes/auth-route");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouer);

app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Sever running on port", port);
});
