import express from 'express'

const app = express()

const livros = [
  {
    id: 1,
    titulo: 'Deep & Dark Web'
  },
  {
    id: 2,
    titulo: 'Steve Jobs'
  }
]

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node')
})

app.get('/livros', (req, res) => {
  res.status(200).json(livros)
})

app.post('/livros', (req, res) => {
  livros.push(req.body)
  res.status(201).json('Livro foi cadastrado com sucesso!!')
})

export default app
