const cover = require("../models/cover");
const coversCtrl = {};

//Adiciona capas
coversCtrl.coverPageForm = (req, res) => {
  res.render("covers/new-cover");
};
coversCtrl.addCovers = async (req, res) => {
  const { tittle, description } = req.body;
  const newCover = new cover({ tittle, description });
  await newCover.save();

  req.flash('deu_certo','CAPA ADICIONADA' )// pimeiro a variavel(que podeser reutilizada) depois mensagem 
  res.redirect("/covers/add");
};

// mostra capas
coversCtrl.renderCovers = async (req, res) => {
  const covers = await cover.find().lean();
  res.render("covers/all-covers", { covers });
};

// edita capas
coversCtrl.coverEditPage = async (req, res) => {
  const editCover = await cover.findById(req.params.id).lean();
  res.render("./covers/edit-covers", { editCover });
};
coversCtrl.coverEdit = async (req, res) => {
  const { _id, tittle, description } = req.body;
  await cover.findOneAndUpdate(_id, {
    tittle: tittle,
    description: description
  });
  req.flash('deu_certo', 'CAPA EDITADA')
  res.redirect("/covers");
};

// deleta capas
coversCtrl.coverDelete = async (req, res) => {
  await cover.findByIdAndDelete(req.params.id);
  req.flash('deu_certo', 'CAPA DELETADA')
  res.redirect("/covers");
};

module.exports = coversCtrl;
