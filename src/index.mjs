import path from "path";
import express from 'express';

const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(
  '/public/stylesheets',
  express.static(__dirname + '/public/stylesheets')
);

app.get('/', function (req, res) {
  // res.send('Hello World test');
  res.render("login")
});

app.listen(3000, () => {
  console.log("Started!");
});