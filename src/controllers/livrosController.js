import NaoEncontrado from "../errors/NaoEncontrado.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import { autores, livros } from "../models/index.js";

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os livros e devolve como resposta eles
 */

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      let { limite = 5, pagina = 1 } = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);

      if (limite > 0 && pagina > 0) {
        const livro = await livros
          .find({})
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor", "nome");

        res.status(200).json(livro);
      } else {
        next(new RequisicaoIncorreta());
      }
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
        $set: req.body,
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const editoraLivro = await livros.find(busca, {}).populate("autor");

        res.status(200).json(editoraLivro);
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  };
}

async function processaBusca(reqQuery) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = reqQuery;
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;

  // lte = Lower Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
