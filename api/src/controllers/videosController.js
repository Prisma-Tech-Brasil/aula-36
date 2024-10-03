const Video = require("../models/Video");
const videosService = require("../services/videosService");

class VideosController {
  index(req, res) {
    const filtros = req.query;
    const videos = videosService.encontrarComFiltros(filtros);
  
    if (videos.length > 0) {
      return res.status(200).json(videos);
    }
  
    return res.status(404).json({ mensagem: "Nenhum vídeo encontrado" });
  }

  show(req, res, next) {
    const video = videosService.buscarPeloId(req.id);
    if (video) {
      return res.status(200).json(video);
    }
    return res.status(404).json({ mensagem: "Vídeo não encontrado" });
  }

  store(req, res, next) {
    const { titulo, descricao, image, canalID } = req.body;

    if (!titulo || !descricao || !image || !canalID) {
      return next(
        new Error(
          "Todos os campos (titulo, descricao, image, canalID) são obrigatórios."
        )
      );
    }

    const novoVideo = new Video(titulo, descricao, image, canalID);
    videosService.adicionar(novoVideo);
    return res.status(201).json(novoVideo);
  }

  update(req, res, next) {
    const video = videosService.buscarPeloId(req.id);
    if (!video) {
      return res.status(404).json({ mensagem: "Vídeo não encontrado" });
    }

    videosService.atualizar(req.id, req.body);
    return res
      .status(200)
      .json({ mensagem: "Vídeo atualizado com sucesso", video });
  }

  delete(req, res, next) {
    const video = videosService.buscarPeloId(req.id);
    if (!video) {
      return res.status(404).json({ mensagem: "Vídeo não encontrado" });
    }

    videosService.excluir(req.id);
    return res
      .status(200)
      .json({ mensagem: `Vídeo id:${req.id} removido com sucesso!`, video });
  }
}

module.exports = new VideosController();
