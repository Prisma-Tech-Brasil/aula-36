const gerarIdUnico = require("../utils/gerarIdUnico");
const { videos } = require("../mocks/dados.json");

class Video {
  constructor(titulo, descricao, image, canalID) {
    this.id = gerarIdUnico(videos);
    this.titulo = titulo;
    this.descricao = descricao;
    this.quantidadeViews = 0;
    this.image = image;
    this.canalID = canalID;
  }

  static adicionarView() {
    this.quantidadeViews += 1
  }

  static exibirInformacoes () {
    return this.quantidadeViews;
  }

  static buscarCanal() {
    return this.canalID;
  }
}

module.exports = Video;
