import autores from "../models/autor.js";

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os autores e devolve como resposta eles
 */

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (err) {
      next(err);
    }
  };

  static listaAutorPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const autor = await autores.findById(id);

      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado" });
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores(req.body);

    try {
      await autor.save();

      res.status(201).send(autor.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso." });
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor excluído com sucesso." });
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
