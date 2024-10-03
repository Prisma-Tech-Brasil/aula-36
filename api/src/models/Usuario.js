const gerarIdUnico = require("../utils/gerarIdUnico");
const { usuarios } = require("../mocks/dados.json");
class Usuario {
  constructor(nome, imagem, email, papel) {
    this.id = gerarIdUnico(usuarios);
    this.nome = nome;
    this.imagem = imagem;
    this.email = email;
    this.papel = papel;
    this.inscricoes = [];
  }

  static pegarPapel() {
    return this.papel;
  }

  static listarInscricoes() {
    return this.inscricoes;
  }

  static inscreverSeNoCanal(idCanal) {
    this.inscricoes.push(parseInt(idCanal));
  }
}

module.exports = { Usuario };
