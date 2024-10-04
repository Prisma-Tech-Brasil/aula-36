const videosRepository = require("../repositories/videosRepository");

class VideosService {
  encontrarTodos() {
    return videosRepository.encontrarTodos();
  }

  encontrarComFiltros(filtros) {
    const videos = videosRepository.encontrarTodos();
    return this.filtrarVideos(videos, filtros);
  }

  filtrarVideos(videos, filtros) {
    return videos.filter((video) => {
      const tituloValido = filtros.titulo
        ? video.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
        : true;
      const descricaoValida = filtros.descricao
        ? video.descricao
            .toLowerCase()
            .includes(filtros.descricao.toLowerCase())
        : true;
      return tituloValido && descricaoValida;
    });
  }

  buscarPeloId(id) {
    return videosRepository.buscarPeloId(id);
  }

  adicionar(video) {
    return videosRepository.adicionar(video);
  }

  atualizar(id, videoAtualizado) {
    return videosRepository.atualizar(id, videoAtualizado);
  }

  excluir(id) {
    return videosRepository.excluir(id);
  }
}

module.exports = new VideosService();
