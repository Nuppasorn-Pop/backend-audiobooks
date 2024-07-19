require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth-route");
const errorMiddleware = require("./middleware/error");
const audiobookRouter = require("./routes/audiobook-route");
const authenticate = require("./middleware/authenticate");
const morgan = require("morgan");
const favoriteRouter = require("./routes/favorite-route");
const app = express();

// app.use(cors());

app.use(
  cors({
    origin: "*",
  })
);

// app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/audiobooks", authenticate, audiobookRouter);
app.use("/favorite", authenticate, favoriteRouter);

app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Sever running on port", port);
});
