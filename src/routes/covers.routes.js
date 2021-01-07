const { Router } = require("express");

const {
  addCovers,
  coverPageForm,
  renderCovers,
  coverEditPage,
  coverEdit,
  coverDelete,
} = require("../controllers/covers.controller");
const { route } = require("./index.routes");
const {isAuth} =  require('../helpers/auth');

const router = Router();

// Adiciona capas
router.get("/covers/add",isAuth, coverPageForm);
router.post("/covers/add", isAuth,addCovers);

// Mostra capas
router.get("/covers", isAuth,renderCovers);

// Edita capas
router.get("/covers/edit/:id", isAuth,coverEditPage);
router.put("/covers/edit/:id", isAuth,coverEdit);

// Deleta capas

router.delete("/covers/delete/:id",isAuth, coverDelete);

module.exports = router;
