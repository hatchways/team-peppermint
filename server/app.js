const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Import Routes
const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const authRouter = require('./routes/auth');
const invitationsRouter = require('./routes/invitation');
const conversationsRouter = require("./routes/conversations");
dotenv.config();

const contactRouter = require("./routes/contacts");


const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(cors({
  credentials: true
}));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/user", invitationsRouter,conversationsRouter, contactRouter);
app.use('/api/user', authRouter);

app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


module.exports = app;
