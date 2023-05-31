import express from 'express'

import db from './config/db.js'

import livros from './models/livro.js'

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node')
})

app.get('/livros', async (req, res) => {
  const livro = await livros.find({})
  res.status(200).json(livro)
})

app.get('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id)

  res.json(livros[index])
})

app.post('/livros', (req, res) => {
  livros.push(req.body)
  res.status(201).json('Livro foi cadastrado com sucesso!!')
})

app.put('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id)

  livros[index].titulo = req.body.titulo

  res.json(livros)
})

app.delete('/livros/:id', (req, res) => {
  const { id } = req.params

  const index = buscaLivro(id)

  livros.splice(index, 1)

  res.send(`Livro ${id} removido com sucesso!`)

  res.json(livros)
})

function buscaLivro(id) {
  return livros.findIndex(livro => {
    return livro.id == id
  })
}

export default app
