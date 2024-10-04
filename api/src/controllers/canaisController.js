const { Canal } = require("../models/Canal");
const UsuarioPapel = require("../models/UsuarioPapel");
const canaisService = require("../services/canaisService");
const errorNotFound = require("../utils/erroNotFound");

class UsuarioDonoController {
  index(req, res, next) {
    try {
      const canais = canaisService.encontrarTodos();

      if (canais.length > 0) {
        res.status(200).json(canais);
      } else {
        errorNotFound(res, "Usuario não encontrado");
      }
    } catch (erro) {
      next(erro);
    }
  }

  show(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const usuario = canaisService.buscarPeloId(id);

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        errorNotFound(res, "Usuario não encontrado");
      }
    } catch (erro) {
      next(erro);
    }
  }

  store(req, res, next) {
    try {
      const imagePath = req.file?.filename;
      const { nome, email } = req.body;

      if (!nome || !email) {
        return next(
          new Error(
            "Todos os campos (titulo, descricao, image, canalID) são obrigatórios."
          )
        );
      }

      const novoCanal = new Canal(
        nome,
        imagePath,
        email,
        UsuarioPapel.USUARIO_DONO
      );

      canaisService.adicionar(novoCanal);
      res.status(201).json(novoCanal);
    } catch (erro) {
      next(erro);
    }
  }

  update(req, res, next) {
    try {
      const body = req.body;
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const usuario = buscarPeloId(id);
      if (!usuario) {
        errorNotFound(res, "Usuario não encontrado");
      }

      canaisService.atualizar(id, body);
      res.status(200).json(usuario);
    } catch (erro) {
      next(erro);
    }
  }

  delete(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const canalRemovido = canaisService.buscarPeloId(id);

      if (canalRemovido) {
        canaisService.excluir(id);
        res.status(200).json({
          mensagem: `canal id:${id} removido com sucesso!`,
          canalRemovido
        });
      } else {
        errorNotFound(res, "Usuario não encontrado");
      }
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = new UsuarioDonoController();
