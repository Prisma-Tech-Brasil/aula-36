const express = require("express");
const rotas = require("./routes");
const rotasPossiveis = require("./mocks/rotas.json");
const manipuladorDeErros = require("./middlewares/manipuladorDeErros");
const naoEncontrado = require("./middlewares/naoEncontrado");
const path = require("node:path");

const app = express();

// app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

// Middleware para permitir requisições JSON
app.use(express.json());

// Definindo a rota principal que lista as possíveis rotas
app.get("/", (req, res) => res.json(rotasPossiveis));

// Usando as rotas
app.use(rotas);

// Middleware de tratamento de erros e rota não encontrada
app.use(naoEncontrado);
app.use(manipuladorDeErros);

module.exports = app;
