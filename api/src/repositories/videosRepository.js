const { videos } = require("../mocks/dados.json");

class VideosRepository {
  encontrarTodos() {
    return videos;
  }

  buscarPeloId(id) {
    return videos.find((v) => v.id === id);
  }

  adicionar(video) {
    videos.push(video);
    return video;
  }

  atualizar(id, videoAtualizado) {
    const video = this.buscarPeloId(id);
    Object.assign(video, videoAtualizado);

    return video;
  }

  excluir(id) {
    const indiceDoVideo = videos.findIndex((v) => v.id === id);

    return videos.splice(indiceDoVideo, 1);
  }
}

module.exports = new VideosRepository();
