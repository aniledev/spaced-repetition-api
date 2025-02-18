const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const notFoundError = require("./middleware/not-found-error");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./auth/auth-router");
const languageRouter = require("./language/language-router");
const userRouter = require("./user/user-router");

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/language", languageRouter);
app.use("/api/user", userRouter);

// TEST BASIC EXPRESS WIRING
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

// 404 ERROR HANDLER MIDDLEWARE
app.use(notFoundError);

app.use(errorHandler);

module.exports = app;
