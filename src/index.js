const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

app.use(express.json());

app.listen(8000);
