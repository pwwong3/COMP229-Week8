const passport = require("passport");
//enable jwt
const jwt = require("jsonwebtoken");
const DB = require("../config/db");

//create the userModel instance
const UserModel = require("../model/user");
const User = UserModel.User; //alias
module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayAboutPage = (req, res, next) => {
  res.render("about", {
    title: "About",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayProductsPage = (req, res, next) => {
  res.render("Products", {
    title: "Products",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayServicesPage = (req, res, next) => {
  res.render("Services", {
    title: "Services",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayContactPage = (req, res, next) => {
  res.render("Contact", {
    title: "Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayLoginPage = (req, res, next) => {
  //check if the user is already logged in
  if (req.user) return res.redirect("/");
  res.render("auth/login", {
    title: "Login",
    messages: req.flash("loginMessage"),
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //server err?
    if (err) return next(err);
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }
      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      };
      const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800, //1 week
      });

      res.json({
        success: true,
        msg: "user Logged in successfully",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
        },
        token: authToken,
      });

      //return res.redirect("/bookList");
    });
  })(req, res, next);
};
module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (req.user) return res.redirect("/");
  res.render("auth/register", {
    title: "Register",
    messages: req.flash("registerMessage"),
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.processRegisterPage = (req, res, next) => {
  //instantiate a user object
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
  });
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error:inserting New User");
      if (err.nme === "UserExistsError") {
        req.flash("registerMessage", "Registration Error:User Already Exists!");
        console.log("Error: UserAlready Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      // if no error exists, then registration is successful
      // redirect the user and authenticate them

      res.json({ success: true, msg: "user Registered successfully!" });

      // return passport.authenticate("local")(req, res, () =>
      //   res.redirect("/bookList")
      // );
    }
  });
};
module.exports.performLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    //res.redirect("/");
  });
  res.json({ success: true, msg: "User log out successfullly!"})
};
