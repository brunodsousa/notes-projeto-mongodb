const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const db = require("../db/connection");
const notesRoutes = require("../routes/notes");

const app = express();

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function (request, response) {
  const notes = await db.getDb().db().collection("notes").find({}).toArray();
  response.render("home", { notes });
});

app.use("/notes", notesRoutes);

db.initDb((error, db) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Banco conectado com sucesso.");
    app.listen(8000);
  }
});
