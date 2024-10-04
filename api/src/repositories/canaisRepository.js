const { canais } = require("../mocks/dados.json");

class CanaisRepository {
  encontrarTodos() {
    return canais;
  }

  buscarPeloId(id) {
    return canais.find((v) => v.id === id);
  }

  adicionar(canal) {
    canais.push(canal);
    return canal;
  }

  atualizar(id, canalAtualizado) {
    const canal = this.buscarPeloId(id);
    Object.assign(canal, canalAtualizado);

    return canal;
  }

  excluir(id) {
    const indiceDoCanal = canais.findIndex((c) => c.id === id);

    return canais.splice(indiceDoCanal, 1);
  }
}

module.exports = new CanaisRepository();
