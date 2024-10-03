const express = require("express");
const router = express.Router();

const videosRoutes = require("./videosRoutes");
const usuariosRoutes = require("./usuariosRoutes");
const canaisRoutes = require("./canaisRoutes");

// Definindo as rotas
router.use("/videos", videosRoutes);
router.use("/canais", canaisRoutes);
router.use("/usuarios", usuariosRoutes);

module.exports = router;
