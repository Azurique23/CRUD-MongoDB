const user = require("../models/user");
const passport = require("passport");
const usersCtrl = {};

usersCtrl.signupPage = (req, res) => {
  res.render("users/signup-page");
};
usersCtrl.signup = async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (password.length <= 4) {
    errors.push("Senha deve ser maior 4");
  }
  const emailExist = await user.findOne({ email: email });
  if (emailExist) {
    errors.push("email estaa sendo usado");
  }

  if (errors.length > 0) {
    res.render("users/signup-page", {
      errors,
      name,
      email,
      password,
    });
  } else {
    const newUser = new user({ name, email, password });
    newUser.password = await newUser.encrypPassword(password);
    await newUser.save();
    req.flash("deu_certo", "Usuario cadastrado");
    res.redirect("/covers");
  }
};

usersCtrl.loginPage = (req, res) => {
  res.render("users/login-page");
};

usersCtrl.login = passport.authenticate("local", {
  successRedirect: "/covers",
  failureRedirect: "/login",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = usersCtrl;
