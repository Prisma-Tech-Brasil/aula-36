const { usuarios } = require("../mocks/dados.json");

class UsuariosRepository {
  encontrarTodos() {
    return usuarios;
  }

  buscarPeloId(id) {
    return usuarios.find((u) => u.id === id);
  }

  adicionar(usuario) {
    usuarios.push(usuario);
    return usuario;
  }

  atualizar(id, usuarioAtualizado) {
    const usuario = this.buscarPeloId(id);
    Object.assign(usuario, usuarioAtualizado);

    return usuario;
  }

  excluir(id) {
    const indiceDoCanal = usuarios.findIndex((c) => c.id === id);

    return usuarios.splice(indiceDoCanal, 1);
  }
}

module.exports = new UsuariosRepository();
