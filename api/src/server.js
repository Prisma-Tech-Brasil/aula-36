const express = require("express");
const servidor = express();

const rotas = require("./utils/rotas.json")

const videosRoutes = require("./routes/videosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const canaisRoutes = require("./routes/canaisRoutes");
const manipuladorDeErros = require("./middlewares/manipuladorDeErros");

// Middleware para permitir requisições JSON
servidor.use(express.json());

// Usando as rotas
servidor.use("/videos", videosRoutes);
servidor.use("/canais", canaisRoutes);
servidor.use("/usuarios", usuariosRoutes);

servidor.get("/", (req, res) => res.json(rotas));

servidor.use(manipuladorDeErros);

// Inicializando o servidor na porta 3000
servidor.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
