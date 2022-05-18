const { render } = require("express/lib/response");
const { ObjectId } = require("mongodb");
const db = require("../db/connection");

const Router = require("express").Router;

const router = Router();

router.get("/", function (request, response) {
  response.render("notes/create");
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;

  const note = await db
    .getDb()
    .db()
    .collection("notes")
    .findOne({ _id: new ObjectId(id) });

  response.render("notes/detail", { note });
});

router.get("/edit/:id", async function (request, response) {
  const { id } = request.params;

  const note = await db
    .getDb()
    .db()
    .collection("notes")
    .findOne({ _id: new ObjectId(id) });

  response.render("notes/edit", { note });
});

router.post("/", function (request, response) {
  const { title, description } = request.body;

  db.getDb().db().collection("notes").insertOne({ title, description });

  response.status(301).redirect("/");
});

router.post("/update", function (request, response) {
  const { id, title, description } = request.body;

  db.getDb()
    .db()
    .collection("notes")
    .updateOne({ _id: new ObjectId(id) }, { $set: { title, description } });

  response.status(301).redirect("/");
});

router.post("/delete", function (request, response) {
  const { id } = request.body;

  db.getDb()
    .db()
    .collection("notes")
    .deleteOne({ _id: new ObjectId(id) });

  response.status(301).redirect("/");
});

module.exports = router;
