import livros from '../models/livro.js'

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os livros e devolve como resposta eles
 */

class LivroController {
  static listarLivros = async (req, res) => {
    const livro = await livros.find({})
    res.status(200).json(livro)
  }
}

export default LivroController
