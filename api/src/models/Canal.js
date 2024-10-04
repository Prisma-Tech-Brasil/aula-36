const { Usuario } = require("./Usuario");
const Video = require("./Video");
const { canais } = require("../mocks/dados.json");

class Canal extends Usuario {
  constructor(id, nome, imagem, email, papel) {
    super(nome, imagem, email, papel);
    this.id = gerarIdUnico(canais);
    this.videos = [];
    this.inscritos = [];
  }

  // Adicionar um novo vídeo
  static postarVideo(video) {
    const novoVideo = new Video(video);
    this.videos.push(novoVideo);

    return novoVideo;
  }

  // Editar um vídeo por ID
  static editarVideo(idVideo, corpo) {
    const video = this.videos.find((video) => video.id === idVideo);

    video.nome = corpo.nome;
    video.imagem = corpo.imagem;
    video.email = corpo.email;

    return video;
  }

  // Remover um vídeo por ID
  static excluirVideo(idVideo) {
    const index = this.videos.findIndex((video) => video.id === idVideo);

    return this.videos.splice(index, 1);
  }

  //Gerenciar inscritos no canal
  static listarInscritos() {
    return this.inscritos;
  }
}

module.exports = { Canal };
