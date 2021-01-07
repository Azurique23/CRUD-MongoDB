const { Router } = require("express");
const router = Router();
const {
  signupPage,
  signup,
  loginPage,
  login,
  logout,
} = require("../controllers/users.controller");

// cadastro de usuario
router.get("/signup", signupPage); // pagina
router.post("/signup", signup); // recerber dados

// login de usuario
router.get("/login", loginPage);
router.post("/user/login", login);

// logout
router.get("/user/logout", logout);

module.exports = router;
