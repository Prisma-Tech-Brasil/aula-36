const Video = require("../models/Video");
const videosRepository = require("../repositories/videosRepository");
const videosService = require("../services/videosService");
const path = require("node:path")
class VideosController {
  index(req, res, next) {
    try {
      console.log(path.resolve(__dirname, "../..", "public"));

      const filtros = req.query;
      const videos = videosService.encontrarComFiltros(filtros);
  
      if (videos.length > 0) {
        return res.status(200).json(videos);
      }
  
      return res.status(404).json({ mensagem: "Nenhum vídeo encontrado" });
    } catch (error) {
      next(error); // Passa o erro para o middleware manipulador de erros
    }
  }

  show(req, res, next) {
    try {
      const video = videosService.buscarPeloId(req.id);
      if (video) {
        return res.status(200).json(video);
      }
      return res.status(404).json({ mensagem: "Vídeo não encontrado" });
    } catch (error) {
      next(error); // Passa o erro para o middleware manipulador de erros
    }
  }

  store(req, res, next) {
    try {
      const imagePath = req.file?.filename;
      const { titulo, descricao, canalID } = req.body;

      if (!titulo || !descricao || !imagePath || !canalID) {
        return next(
          new Error(
            "Todos os campos (titulo, descricao, image, canalID) são obrigatórios."
          )
        );
      }

      const novoVideo = new Video(titulo, descricao, imagePath, canalID);
      videosRepository.adicionar(novoVideo);
      return res.status(201).json(novoVideo);
    } catch (error) {
      next(error); // Passa o erro para o middleware manipulador de erros
    }
  }

  update(req, res, next) {
    try {
      const video = videosService.buscarPeloId(req.id);
      if (!video) {
        return res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }

      videosService.atualizar(req.id, req.body);
      return res
        .status(200)
        .json({ mensagem: "Vídeo atualizado com sucesso", video });
    } catch (error) {
      next(error); // Passa o erro para o middleware manipulador de erros
    }
  }

  delete(req, res, next) {
    try {
      const video = videosService.buscarPeloId(req.id);
      if (!video) {
        return res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }

      videosService.excluir(req.id);
      return res
        .status(200)
        .json({ mensagem: `Vídeo id:${req.id} removido com sucesso!`, video });
    } catch (error) {
      next(error); // Passa o erro para o middleware manipulador de erros
    }
  }
}

module.exports = new VideosController();
