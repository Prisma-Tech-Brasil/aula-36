const Video = require("../models/Video");
const videosService = require("../services/videosService");
const errorNotFound = require("../utils/erroNotFound");
class VideosController {
  index(req, res, next) {
    try {
      const filtros = req.query;
      const videos = videosService.encontrarComFiltros(filtros);

      if (videos.length > 0) {
        return res.status(200).json(videos);
      }

      errorNotFound(res, "Vídeo não encontrado");
    } catch (error) {
      next(error);
    }
  }

  show(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }
      const video = videosService.buscarPeloId(id);
      if (video) {
        return res.status(200).json(video);
      }
      errorNotFound(res, "Vídeo não encontrado");
    } catch (error) {
      next(error);
    }
  }

  store(req, res, next) {
    try {
      const imagePath = req.file?.filename;
      const { titulo, descricao, canalID } = req.body;

      if (!titulo || !descricao || !canalID) {
        return next(
          new Error(
            "Todos os campos (titulo, descricao, image, canalID) são obrigatórios."
          )
        );
      }

      const novoVideo = new Video(
        titulo,
        descricao,
        imagePath,
        parseInt(canalID)
      );
      
      videosService.adicionar(novoVideo);
      return res.status(201).json(novoVideo);
    } catch (error) {
      next(error);
    }
  }

  update(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const video = videosService.buscarPeloId(id);
      if (!video) {
        errorNotFound(res, "Vídeo não encontrado");
      }

      videosService.atualizar(id, req.body);
      return res
        .status(200)
        .json({ mensagem: "Vídeo atualizado com sucesso", video });
    } catch (error) {
      next(error);
    }
  }

  delete(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const video = videosService.buscarPeloId(id);
      if (!video) {
        errorNotFound(res, "Vídeo não encontrado");
      }

      videosService.excluir(id);
      return res
        .status(200)
        .json({ mensagem: `Vídeo id:${id} removido com sucesso!`, video });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VideosController();
