require("dotenv").config({ path: "vars.env" });

// dependencys
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// routes
const routes = require("./routes.js");

// server
const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/monolito", routes);

server.listen(process.env.API_PORT, () => {
  console.log(
    `\n\n\nServidor rodando em: http://localhost:${process.env.API_PORT}\n\n\n`
  );
});
