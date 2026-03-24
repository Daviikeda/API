# API de Figurinhas - Documentação

Base URL: [http://localhost:3000](http://localhost:3000)
Link da Collection Postman: https://daviikedalopes-2971244.postman.co/workspace/Davi-Ikeda-Lopes's-Workspace~14990e26-850b-40dc-8214-15d68b655f7a/collection/53435818-c718b4ce-aadf-472b-ba49-a5cd030602bb?action=share&source=copy-link&creator=53435818

---

ENDPOINT 1: GET /api/figurinhas

Descrição:
Lista todas as figurinhas com filtros opcionais.

Parâmetros (query):

* categoria
* preco_max
* preco_min
* estoque
* ordem (preco ou nome)
* direcao (asc ou desc)

Exemplo de requisição (Postman):
GET [http://localhost:3000/api/figurinhas?categoria=Jogador&preco_max=10](http://localhost:3000/api/figurinhas?categoria=Jogador&preco_max=10)

Resposta:
[
{
"id": 2,
"nome": "Alisson Becker",
"preco": 5,
"categoria": "Jogador",
"estoque": 20
}
]

---

ENDPOINT 2: POST /api/figurinhas

Descrição:
Cria uma nova figurinha.

Body:
{
"id": 6,
"nome": "Messi",
"preco": 100,
"categoria": "Jogador",
"estoque": 60
}

Exemplo de uso no Postman:

* Método: POST
* Body: raw JSON

Resposta:
{
"id": 6,
"nome": "Messi",
"preco": 100,
"categoria": "Jogador",
"estoque": 60
}

---

ENDPOINT 3: PUT /api/figurinhas/:id

Descrição:
Atualiza completamente uma figurinha existente.

URL:
[http://localhost:3000/api/figurinhas/6](http://localhost:3000/api/figurinhas/6)

Body:
{
"nome": "Messi Raro",
"preco": 150,
"categoria": "Jogador",
"estoque": 30
}

Resposta:
{
"id": 6,
"nome": "Messi Raro",
"preco": 150,
"categoria": "Jogador",
"estoque": 30
}

Possíveis erros:

* 404: Figurinha não encontrada
* 400: Campos obrigatórios não preenchidos

---

ENDPOINT 4: DELETE /api/figurinhas/:id

Descrição:
Remove uma figurinha.

URL:
[http://localhost:3000/api/figurinhas/6](http://localhost:3000/api/figurinhas/6)

Resposta:
{
"mensagem": "Figurinha removida com sucesso",
"figurinha": {
"id": 6,
"nome": "Messi",
"preco": 100,
"categoria": "Jogador",
"estoque": 60
}
}

---

TESTES NO POSTMAN

GET:

* Método: GET
* URL: [http://localhost:3000/api/figurinhas](http://localhost:3000/api/figurinhas)

POST:

* Método: POST
* Body em JSON

PUT:

* Método: PUT
* URL com ID
* Body completo

DELETE:

* Método: DELETE
* URL com ID

---

VALIDAÇÕES IMPLEMENTADAS

PUT:

* Todos os campos são obrigatórios
* Retorna erro 400 se faltar algum campo
* Retorna erro 404 se o ID não existir

GET:

* Filtros opcionais
* Conversão de tipos (parseInt, parseFloat)

DELETE:

* Verifica se o ID existe antes de remover

---

CONCLUSÃO

API REST completa com operações CRUD:

* GET: leitura
* POST: criação
* PUT: atualização
* DELETE: remoção

Pronta para uso e testes com Postman.
