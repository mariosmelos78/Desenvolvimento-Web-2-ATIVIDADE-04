const express = require('express');
const app = express();
const PORT = 3000;

// 1. Dados da API (8 itens com id, nome, categoria e +2 campos específicos: cidade e nota)
const praias = [
  { id: 1, nome: "Praia do Futuro", categoria: "urbana", cidade: "Fortaleza", nota: 9 },
  { id: 2, nome: "Canoa Quebrada", categoria: "falesias", cidade: "Aracati", nota: 10 },
  { id: 3, nome: "Jericoacoara", categoria: "parque", cidade: "Jijoca de Jericoacoara", nota: 10 },
  { id: 4, nome: "Praia do Cumbuco", categoria: "urbana", cidade: "Caucaia", nota: 8 },
  { id: 5, nome: "Morro Branco", categoria: "falesias", cidade: "Beberibe", nota: 9 },
  { id: 6, nome: "Flecheiras", categoria: "pesca", cidade: "Trairi", nota: 8 },
  { id: 7, nome: "Lagoinha", categoria: "parque", cidade: "Paraipaba", nota: 9 },
  { id: 8, nome: "Praia da Taíba", categoria: "pesca", cidade: "São Gonçalo do Amarante", nota: 7 }
];

// 2. Middleware Global (Registra horário, método e URL no terminal)
app.use((req, res, next) => {
  const horario = new Date().toISOString();
  console.log(`[${horario}] ${req.method} ${req.url}`);
  next();
});

// 3. Rota GET / (Mensagem de boas-vindas citando o nome da API)
app.get('/', (req, res) => {
  res.send('<h1>Bem-vindo à API de Praias do Ceará!</h1><p>Explore as belezas do nosso litoral.</p>');
});

// 4. Rota GET /praias (Lista completa, filtros por categoria, notaMin e bônus combinando ambos)
app.get('/praias', (req, res) => {
  const { categoria, notaMin } = req.query;
  let resultado = [...praias];

  // Filtro Numérico por Query String com Validação (parseInt e isNaN)
  if (notaMin !== undefined) {
    const notaMinima = parseInt(notaMin);
    if (isNaN(notaMinima)) {
      return res.status(400).json({ erro: "O parâmetro 'notaMin' precisa ser um número válido." });
    }
    resultado = resultado.filter(p => p.nota >= notaMinima);
  }

  // Filtro por Categoria por Query String (Opcional - bônus de ignorar maiúsculas/minúsculas)
  if (categoria) {
    resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  }

  res.json(resultado);
});

// 5. Rota GET /praias/:id (Busca por ID com validação de número e existência)
app.get('/praias/:id', (req, res) => {
  const idParam = req.params.id;
  const idNumero = parseInt(idParam);

  // Validação: Se não for um número
  if (isNaN(idNumero)) {
    return res.status(400).json({ erro: "O ID fornecido deve ser um número válido." });
  }

  const praiaEncontrada = praias.find(p => p.id === idNumero);

  // Validação: Se não existir o item
  if (!praiaEncontrada) {
    return res.status(404).json({ erro: "Praia não encontrada no nosso catálogo." });
  }

  res.json(praiaEncontrada);
});

// Inicialização do Servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
