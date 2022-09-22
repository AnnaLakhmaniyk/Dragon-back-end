const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const dragonRouter = require("./src/routes/api/contactsRouter");
// const usersRouter = require("./src/routes/api/userRouter");
const dataRouter = require("./src/routers/dataRouter.js");
const authRouter = require("./src/routers/authRouter");
// const { errorHandler } = require("./src/helpers/apiHelpers");
//
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/dragons", dataRouter);
app.use("/api/auth", authRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
