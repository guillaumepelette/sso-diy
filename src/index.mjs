import path from "path";
import express from 'express';
import db, { findKeyInDb } from "../db/index.mjs";

const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(
  '/public/stylesheets',
  express.static(__dirname + '/public/stylesheets')
);

app.use(express.urlencoded());

app.use((req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);

  req.cookies = {};

  if (!cookies) {
    return next();
  }

  const cookiesArray = cookies.split("; ");
  const parsedCookies = {};

  for (let cookie of cookiesArray) {
    const [key, value] = cookie.split("=");
    parsedCookies[key] = value;
  }

  req.cookies = parsedCookies;

  next();
});

app.get('/', function (req, res) {
  // Objectif : distinguer deux cas :
  // - soit l'utilisateur est anonyme (pas de cookies de session, soit invalide)
  // - soit l'utilisateur est connecté (cookie de session valide)
  console.log(">>>>>>", req.cookies);
  if (req.cookies.sso_session) {
    res.render("logout")
  } else {
    res.render("login")
  }
});

app.get("/api/session", function (req, res) {
  console.log("-----", req.cookies);
  res.render("session", { token: req.cookies.sso_session });
});

app.post("/api/session/login", function (req, res) {
  // Objectif: vérifier la validité | des identifiants | reçus
  // 1. récupérer les données envoyées en POST
  console.log(req.body);
  const { email, password } = req.body;
  // 2. trouver l'utilisateur en bdd qui correspond à l'email reçu
  const user = findKeyInDb(db, email);
  if (user === false) {
    res.send(404);
    return;
  }
  // 3. vérifier que le mot de passe reçu est bien celui attendu
  if (password === user.password) {
    res.cookie("sso_session", email, {
      sameSite: "none",
      secure: true
    })
      // .send(200);
      .redirect("/api/session");
  } else {
    res.send(500);
  }
})

app.listen(3000, () => {
  console.log("Started!");
});