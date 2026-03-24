// 1. Importar Express
const express = require('express');

// 2. Criar aplicação
const app = express();

// 3. Definir porta
const PORT = 3000;

// 4. Middleware para JSON
app.use(express.json());

// 5. Criar primeiro endpoint
app.get('/', (req, res) => {
    res.json({
        mensagem: '🎉 Minha primeira API funcionando!',
        status: 'sucesso',
        timestamp: new Date().toISOString()
    });
});

// 6. Endpoint de informações
app.get('/info', (req, res) => {
    res.json({
        nome: 'Minha API REST',
        versao: '1.0.0',
        autor: 'Seu Nome'
    });
});

// 7. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});


// AULA 03

// GET /api/produtos - Listar todos

// Banco de dados "fake" em memória
let figurinhas = [
    {
        id: 1,
        nome: "Brasil",
        preco: 10,
        categoria: "Escudo",
        estoque: 15
    },
    {
        id: 2,
        nome: "Alisson Becker",
        preco: 5,
        categoria: "Jogador",
        estoque: 20
    },
    {
        id: 3,
        nome: "Neymar Jr.",
        preco: 5,
        categoria: "Jogador",
        estoque: 100
    },
    {
        id: 4,
        nome: "Pelé",
        preco: 20,
        categoria: "Legend",
        estoque: 10
    }
];

// GET
app.get('/api/figurinhas', (req, res) => {

    const {categoria, preco_max, preco_min, estoque, ordem, direcao} = req.query;

    let resultado = figurinhas;

    if (categoria) {
        resultado = resultado.filter(f => f.categoria === categoria);
    }
    if (preco_max) {
        resultado = resultado.filter(f => f.preco <= parseFloat(preco_max))
    }
    if (preco_min) {
        resultado = resultado.filter(f => f.preco >= parseFloat(preco_min))
    }
    if (estoque) {
        resultado = resultado.filter(f => f.estoque >= parseInt(estoque))
    }

    // Ordenação
    if (ordem) {
        resultado = resultado.sort((a, b) => {
            if (ordem === 'preco') {
                return direcao === 'desc' ? b.preco - a.preco : a.preco - b.preco;
            }
            if (ordem === 'nome') {
                return direcao === 'desc' ? b.nome.localeCompare(a.nome) : a.nome.localeCompare(b.nome);
            }
        });
    }

    res.json(resultado);
});


// POST
app.post('/api/figurinhas', (req, res) => {
    // 1. Pegar dados do body
    const { id, nome, preco, categoria, estoque } = req.body;
    
    // 2. Criar objeto do novo produto
    const novaFigurinha = {
        id,
        nome,
        preco,
        categoria,
        estoque
    };
    
    // 3. Adicionar ao array
    figurinhas.push(novaFigurinha);
    
    // 4. Retornar produto criado com status 201
    res.status(201).json(novaFigurinha);
});

app.listen(3000, () => console.log('🚀 API na porta 3000'));


app.put('/api/figurinhas/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);

    // 2. Buscar figurinha
    const figurinha = figurinhas.find(f => f.id === id);

    // 3. Verificar se existe
    if (!figurinha) {
        return res.status(404).json({
            erro: "Figurinha não encontrada"
        });
    }

    // 4. Pegar dados do body
    const { nome, preco, categoria, estoque } = req.body;

    // 5. Validação (PUT = tudo obrigatório)
    if (!nome || !preco || !categoria || !estoque) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria, estoque"
        });
    }

    // 6. Atualizar
    figurinha.nome = nome;
    figurinha.preco = preco;
    figurinha.categoria = categoria;
    figurinha.estoque = estoque;

    // 7. Retornar atualizado
    res.json(figurinha);
});


app.delete('/api/figurinhas/:id', (req, res) => {
    // 1. Pegar o ID da URL
    const id = parseInt(req.params.id);

    // 2. Encontrar índice da figurinha
    const index = figurinhas.findIndex(f => f.id === id);

    // 3. Verificar se existe
    if (index === -1) {
        return res.status(404).json({
            erro: "Figurinha não encontrada"
        });
    }

    // 4. Remover do array
    const removida = figurinhas.splice(index, 1);

    // 5. Retornar confirmação
    res.json({
        mensagem: "Figurinha removida com sucesso",
        figurinha: removida[0]
    });
});
