const canaisRepository = require("../repositories/canaisRepository");

class CanaisService {
  encontrarTodos() {
    return canaisRepository.encontrarTodos();
  }

  encontrarComFiltros(filtros) {
    const canais = canaisRepository.encontrarTodos();
    return this.filtrarCanais(canais, filtros);
  }

  filtrarCanais(canais, filtros) {
    return canais.filter((canal) => {
      const nomeValido = filtros.nome
        ? canal.nome.toLowerCase().includes(filtros.nome.toLowerCase())
        : true;
      const cpfValida = filtros.cpf
        ? canal.cpf.toLowerCase().includes(filtros.cpf.toLowerCase())
        : true;
      const emailValida = filtros.email
        ? canal.email.toLowerCase().includes(filtros.email.toLowerCase())
        : true;
      return nomeValido && cpfValida && emailValida;
    });
  }

  buscarPeloId(id) {
    return canaisRepository.buscarPeloId(id);
  }

  adicionar(canal) {
    return canaisRepository.adicionar(canal);
  }

  atualizar(id, canalAtualizado) {
    return canaisRepository.atualizar(id, canalAtualizado);
  }

  excluir(id) {
    return canaisRepository.excluir(id);
  }
}

module.exports = new CanaisService();
