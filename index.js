const _ = require("lodash");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const scrabble = require("./lib/scrabble");

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const publicDir = __dirname + "/app";

app.use(bodyParser.json());

app.get(["/"], (req, res) => {
  res.sendFile(path.join(publicDir, "/index.html"));
});

app.get("/api/solve", (req, res) => {
  const solution = scrabble.findBestWord();
  return res.json(solution);
});

app.use(express.static(publicDir));
app.use(
  errorHandler({
    dumpExceptions: true,
    showStack: true
  })
);

console.log(
  "Simple static server showing %s listening at port %s",
  publicDir,
  port
);
app.listen(port);
