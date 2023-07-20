import autores from "../models/autor.js";

/**
 * - Instância uma classe e um método estático que tem a função/tarefa de listar todos os autores e devolve como resposta eles
 */

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro no servidor", error: err.message });
    }
  };

  static listaAutorPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const autor = await autores.findById(id);

      res.status(200).json(autor);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erro ao procurar autor.", error: err.message });
    }
  };

  static cadastrarAutor = async (req, res) => {
    let autor = new autores(req.body);

    try {
      await autor.save();

      res.status(201).send(autor.toJSON());
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erro ao cadastrar autor.", error: err.message });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Erro ao atualizar autor.", error: err.message });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor excluído com sucesso." });
    } catch (err) {
      res
        .status(500)
        .send({ message: "Erro ao deletar autor.", error: err.message });
    }
  };
}

export default AutorController;
