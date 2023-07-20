import livros from "../models/livro.js";

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os livros e devolve como resposta eles
 */

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livro = await livros.find({}).populate("autor", "nome");

      res.status(200).json(livro);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro interno no servidor", error: err.message });
    }
  };

  static listaLivroPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const livro = await livros.findById(id).populate("autor", "nome");

      res.status(200).json(livro);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erro ao procurar livro.", error: err.message });
    }
  };

  static cadastrarLivro = async (req, res) => {
    let livro = new livros(req.body);

    try {
      await livro.save();

      res.status(201).send(livro.toJSON());
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erro ao cadastrar livro.", error: err.message });
    }
  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erro ao atualizar livro.", error: err.message });
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro excluído com sucesso." });
    } catch (err) {
      res
        .status(500)
        .send({ message: "Erro ao deletar livro.", error: err.message });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;
    try {
      const editoraLivro = await livros.find({ editora: editora }, {});

      res.status(200).json(editoraLivro);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erro interno no servidor", error: err.message });
    }
  };
}

export default LivroController;
