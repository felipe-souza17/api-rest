import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os livros e devolve como resposta eles
 */

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livro = await livros.find({}).populate("autor", "nome");

      res.status(200).json(livro);
    } catch (err) {
      next(err);
    }
  };

  static listaLivroPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const livro = await livros.findById(id).populate("autor", "nome");

      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);

    try {
      await livro.save();

      res.status(201).send(livro.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const atualizaLivro = await livros.findByIdAndUpdate(id, {
        $set: req.body
      });

      if (atualizaLivro !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso." });
      } else {
        next(
          new NaoEncontrado(
            "Não foi possível encontrar o ID do livro ao atualizar."
          )
        );
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const deletarLivro = await livros.findByIdAndDelete(id);

      if (deletarLivro !== null) {
        res.status(200).send({ message: "Livro excluído com sucesso." });
      } else {
        next(
          new NaoEncontrado(
            "Não foi possível encontrar o ID do livro ao excluir."
          )
        );
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const editoraLivro = await livros.find({ editora: editora }, {});

      res.status(200).json(editoraLivro);
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
