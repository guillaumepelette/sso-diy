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

// permet de parser les ressources json de la requête pour récupéer les données
app.use(express.urlencoded());

app.get('/', function (req, res) {
  // res.send('Hello World test');
  res.render("login")
});

app.post("/api/session/login", function (req, res) {
  // ...
  // console.log("TODO: implémenter cette action");
  // Objectif: vérifier la validité | des identifiants | reçus
  // 1. récupérer les données envoyées en POST
  console.log(req.body);
  const { email, password } = req.body;
  // 2. trouver l'utilisateur en bdd qui correspond à l'email reçu
  const user = findKeyInDb(db, email);
  // 3. vérifier que le mot de passe reçu est bien celui attendu
  if (user.password === password) {
    res.send(200);
  } else {
    res.status(401).send("Identifiants invalides");
  }
})

app.listen(3000, () => {
  console.log("Started!");
});