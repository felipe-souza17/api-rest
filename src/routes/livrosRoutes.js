import express from 'express'
import LivroController from '../controllers/livrosController.js'

/**
 * Usa o roteamento do express para que busque através do controlador quando acessar a rota /livros através do método GET e por fim exporta para usar no nosso index.js
 */
const router = express.Router()

router
  .get('/livros', LivroController.listarLivros)
  .get('/livros/:id', LivroController.listaLivroPorId)
  .post('/livros', LivroController.cadastrarLivro)
  .put('/livros/:id', LivroController.atualizarLivro)

export default router
