// Função que retorna o erro 404
function errorNotFound(res, message = "Recurso não encontrado") {
  return res.status(404).json({ mensagem: message });
}

module.exports = errorNotFound;
