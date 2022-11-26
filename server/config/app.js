const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
//modules for authentication
const session = require("express-session");
const passportLocal = require("passport-local");
const localStrategy = passportLocal.Strategy;
const flash = require("connect-flash");
const mongoose = require("mongoose");
const db = require("./db");
//point mongoose to the db URI
mongoose.connect(db.URI);
const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "connection Error:"));
mongoDB.once("open", () => {
  console.log("connected to MongoDB...");
});

const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const booksRouter = require("../routes/book");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));
app.use(cors());

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//initialize flash
app.use(flash());
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//passport user Configuration
//Create a user model instance
const userModel = require("../model/user");
const User = userModel.User;
passport.use(User.createStrategy());
//serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = db.Secret;
const strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then((User) => {
      return done(null, User);
    })
    .catch((err) => {
      return done(err, false);
    });
});
passport.use(strategy);
//routing
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/book-list", booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
