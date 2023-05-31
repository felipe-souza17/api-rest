import livros from '../models/livro.js'

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os livros e devolve como resposta eles
 */

class LivroController {
  static listarLivros = async (req, res) => {
    const livro = await livros.find({})
    res.status(200).json(livro)
  }

  static cadastrarLivro = async (req, res) => {
    let livro = new livros(req.body)

    try {
      await livro.save()

      res.status(201).send(livro.toJSON())
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Erro ao cadastrar livro.' })
    }
  }
}

export default LivroController
