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

const router = Router();

// Adiciona capas
router.get("/covers/add", coverPageForm);
router.post("/covers/add", addCovers);

// Mostra capas
router.get("/covers", renderCovers);

// Edita capas
router.get("/covers/edit/:id", coverEditPage);
router.put("/covers/edit/:id", coverEdit);

// Deleta capas

router.delete("/covers/delete/:id", coverDelete);

module.exports = router;
