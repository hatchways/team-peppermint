const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const passport = require('passport')
require('./config/passport.config')(passport)


//Import Routes
const indexRouter = require("./routes/index");


const authRouter = require("./routes/auth.routes");
const conversationsRouter = require("./routes/conversation.routes");

const userRouter = require("./routes/user.routes");

const { handleErrors } = require("./utilities/errors");

const { json, urlencoded } = express;

const app = express();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err) => {

  if (err) throw new Error(err)
  else { console.log('connected to db') }


})

const corsOptions = {
  origin: '*'
}

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(json());
app.use(express.static('build'));
app.use(passport.initialize());
app.use(passport.session());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/ping", pingRouter);
// app.use("/user", invitationsRouter );
app.use("/api/user", authRouter, userRouter);
app.use("/api/conversations", conversationsRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.json({ error: err });
  handleErrors(err, req, res, next)
});

// Landing route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

module.exports = app;
