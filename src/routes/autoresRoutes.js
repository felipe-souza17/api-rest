import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

/**
 * Usa o roteamento do express para que busque através do controlador quando acessar a rota /livros através do método GET e por fim exporta para usar no nosso index.js
 */
const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/:id", AutorController.listaAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;
