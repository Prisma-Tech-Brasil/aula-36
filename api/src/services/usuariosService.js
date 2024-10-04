const usuariosRepository = require("../repositories/usuariosRepository");

class UsuariosService {
  encontrarTodos() {
    return usuariosRepository.encontrarTodos();
  }

  encontrarComFiltros(filtros) {
    const usuarios = usuariosRepository.encontrarTodos();
    return this.filtrarUsuarios(usuarios, filtros);
  }

  filtrarUsuarios(usuarios, filtros) {
    return usuarios.filter((usuario) => {
      const nomeValido = filtros.nome
        ? usuario.nome.toLowerCase().includes(filtros.nome.toLowerCase())
        : true;
      const cpfValida = filtros.cpf
        ? usuario.cpf.toLowerCase().includes(filtros.cpf.toLowerCase())
        : true;
      const emailValida = filtros.email
        ? usuario.email.toLowerCase().includes(filtros.email.toLowerCase())
        : true;
      return nomeValido && cpfValida && emailValida;
    });
  }

  buscarPeloId(id) {
    return usuariosRepository.buscarPeloId(id);
  }

  adicionar(usuario) {
    return usuariosRepository.adicionar(usuario);
  }

  atualizar(id, usuarioAtualizado) {
    return usuariosRepository.atualizar(id, usuarioAtualizado);
  }

  excluir(id) {
    return usuariosRepository.excluir(id);
  }
}

module.exports = new UsuariosService();
