function manipuladorDeErros(err, req, res, next) {
  console.error(err);

  return res.status(err.status || 500).json({
    mensagem: err.message || "Erro interno do servidor",
    detalhes: err.details || {}
  });
}

module.exports = manipuladorDeErros;
