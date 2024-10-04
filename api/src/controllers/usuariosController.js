const { Usuario } = require("../models/Usuario");
const UsuarioPapel = require("../models/UsuarioPapel");
const usuariosService = require("../services/usuariosService");
const errorNotFound = require("../utils/erroNotFound");

class UsuariosController {
  index(req, res, next) {
    try {
      const usuarios = usuariosService.encontrarTodos();

      if (usuarios.length > 0) {
        res.status(200).json(usuarios);
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

      const usuario = usuariosService.buscarPeloId(id);

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
      const { nome, imagem, email } = req.body;

      if (!nome || !email) {
        return next(
          new Error(
            "Todos os campos (nome, email, image, papel) são obrigatórios."
          )
        );
      }

      const novoUsuario = new Usuario(
        nome,
        imagem,
        email,
        UsuarioPapel.USUARIO_INSCRITO
      );

      usuariosService.adicionar(novoUsuario);
      res.status(201).json(novoUsuario);
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

      const usuario = usuariosService.buscarPeloId(id);
      if (!usuario) {
        errorNotFound(res, "Usuario não encontrado");
      }

      usuariosService.atualizar(id, body);
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

      const usuarioRemovido = usuariosService.buscarPeloId(id);

      if (usuarioRemovido) {
        usuariosService.excluir(id);
        res.status(200).json({
          mensagem: `Usuário id:${id} removido com sucesso!`,
          usuarioRemovido
        });
      } else {
        errorNotFound(res, "Usuario não encontrado");
      }
    } catch (erro) {
      next(erro);
    }
  }
}

module.exports = new UsuariosController();
