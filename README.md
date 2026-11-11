# API Praias do Ceará 🌊

API desenvolvida para a disciplina de Desenvolvimento.Lista e filtra dados sobre praias famosas do Ceará.

## Como instalar e rodar

1. Certifique-se de ter o Node.js instalado.
2. Na pasta do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node index.js
   ```

## Tabela de Rotas

| Rota                        | Exemplo de Endereço                             | Descrição                                                               |
| :-------------------------- | :---------------------------------------------- | :---------------------------------------------------------------------- |
| `GET /`                     | `http://localhost:3000/`                        | Retorna uma mensagem de boas-vindas à API.                              |
| `GET /praias`               | `http://localhost:3000/praias`                  | Retorna o JSON com a lista de todas as praias.                          |
| `GET /praias/:id`           | `http://localhost:3000/praias/2`                | Retorna apenas a praia correspondente ao ID informado.                  |
| `GET /praias?categoria=...` | `http://localhost:3000/praias?categoria=urbana` | Filtra as praias por uma categoria específica.                          |
| `GET /praias?notaMin=...`   | `http://localhost:3000/praias?notaMin=9`        | **Filtro Numérico:** Filtra praias com nota maior ou igual à informada. |

## Requisito Próprio (Ir além do básico)

Foi implementada a **combinação de múltiplos filtros simultâneos** na rota de listagem e o bônus de **ignorar letras maiúsculas/minúsculas** no filtro de categoria. Exemplo:

- `http://localhost:3000/praias?categoria=URBANA&notaMin=8`
