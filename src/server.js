const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const { set } = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const flash = require("connect-flash");
const expSession = require("express-session");
//Init
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  exphbs({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(
  expSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//Global Variables
app.use((req, res, next) => {
  res.locals.deu_certo = req.flash("deu_certo"); // variavel da mensagem global
  next();
});

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/covers.routes"));
app.use(require("./routes/users.routes"));

// Statics Files

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
