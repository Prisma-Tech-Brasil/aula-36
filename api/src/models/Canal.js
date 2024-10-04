const { Usuario } = require("./Usuario");
const Video = require("./Video");
const { canais } = require("../mocks/dados.json");
const gerarIdUnico = require("../utils/gerarIdUnico");

class Canal extends Usuario {
  constructor(nome, imagem, email, papel, inscricoes) {
    super(nome, imagem, email, papel, inscricoes);
    this.id = gerarIdUnico(canais);
    this.videos = [];
    this.inscritos = [];
  }

  static postarVideo(video) {
    const novoVideo = new Video(video);
    this.videos.push(novoVideo);

    return novoVideo;
  }

  static editarVideo(idVideo, corpo) {
    const video = this.videos.find((video) => video.id === idVideo);

    video.nome = corpo.nome;
    video.imagem = corpo.imagem;
    video.email = corpo.email;

    return video;
  }

  static excluirVideo(idVideo) {
    const index = this.videos.findIndex((video) => video.id === idVideo);

    return this.videos.splice(index, 1);
  }

  static listarInscritos() {
    return this.inscritos;
  }
}

module.exports = { Canal };
