const { Router } = require("express");
const router = Router();
const {
  signupPage,
  signup,
  loginPage,
  login,
} = require("../controllers/users.controller");

// cadastro de usuario
router.get("/signup", signupPage); // pagina
router.post("/signup", signup); // recerber dados

// login de usuario
router.get("/login", loginPage);
router.post("/login", login);

module.exports = router;
