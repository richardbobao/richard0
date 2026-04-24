const express = require('express');
const app = express();

app.use(express.json());

let tarefas = [];
let id = 1;

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
    const novaTarefa = {
        id: id++,
        titulo: req.body.titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id == req.params.id);

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    tarefa.concluida = true;
    res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
    tarefas = tarefas.filter(t => t.id != req.params.id);
    res.json({ mensagem: 'Removida' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
