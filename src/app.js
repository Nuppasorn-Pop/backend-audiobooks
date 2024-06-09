require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth-route");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const audiobookRouter = require("./routes/audiobook-route");
const authenticate = require("./middleware/authenticate");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/audiobooks", authenticate, audiobookRouter);

app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Sever running on port", port);
});
