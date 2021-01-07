const Covers = require("../models/cover");
const coversCtrl = {};

//Adiciona capas
coversCtrl.coverPageForm = (req, res) => {
  res.render("covers/new-cover");
};
coversCtrl.addCovers = async (req, res) => {
  const { tittle, description } = req.body;
  const newCover = new Covers({ tittle, description, user: req.user._id });
  await newCover.save();

  req.flash("deu_certo", "CAPA ADICIONADA"); // pimeiro a variavel(que podeser reutilizada) depois mensagem
  res.redirect("/covers/add");
};

// mostra capas
coversCtrl.renderCovers = async (req, res) => {
  const covers = await Covers.find({ user: req.user.id }).lean().sort({createdAt: 'desc'});
  res.render("covers/all-covers", { covers });
};

// edita capas
coversCtrl.coverEditPage = async (req, res) => {
  const editCover = await Covers.findById(req.params.id).lean();
  if (editCover.user == req.user.id) {
    return res.render("./covers/edit-covers", { editCover });
  }
  req.flash("errors", "Ta querendo o que");
  res.redirect("/covers");
};
coversCtrl.coverEdit = async (req, res) => {
  const { _id, tittle, description } = req.body;
  if (await Covers.find({$and:[{_id:_id}, {user: req.user.id}] })) {
    await Covers.findOneAndUpdate(_id, {
      tittle: tittle,
      description: description,
    });

    req.flash("deu_certo", "CAPA EDITADA");
    res.redirect("/covers");
  }else{
    req.flash("errors", "Ta querendo o que");
    res.redirect("/covers");
  }
};

// deleta capas
coversCtrl.coverDelete = async (req, res) => {
  const cover = await Covers.findById(req.params.id).lean();
  console.log(cover)
  console.log(req.user.id)
  if (cover.user == req.user.id) {
    await Covers.findByIdAndDelete(req.params.id);
    req.flash("deu_certo", "CAPA DELETADA");
    res.redirect("/covers");
  }
  else{
    req.flash("errors", "Ta querendo o que");
    res.redirect("/covers");
  }
  };

module.exports = coversCtrl;
