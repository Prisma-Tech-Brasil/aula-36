const app = require("./app");

// Inicializando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
