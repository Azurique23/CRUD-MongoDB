const user = require("../models/user");
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

usersCtrl.login = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await user.findOne(
    { email: email },
    { _id: 0, email: 1, password: 1 }
  );

  if (emailExist) {
    const result = await emailExist.matchPassword(password);

    if (result) {
      req.flash("deu_certo", "Logado Com sucesso");
      res.render('home')  ;
    } else {
      errors = ["Email ou senha icorreto"];
      res.render("users/login-page", { errors, email });
    }
  } else {
    errors = ["Email ou senha icorreto"];
    res.render("users/login-page", { errors, email });
  }
};

module.exports = usersCtrl;
