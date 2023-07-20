import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

/**
 * Recebe nosso app e gerencia todas as nossas rotas que estão dentro de /routes e depois exporta para ser usado em app.js
 */
const routes = app => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de Node com Mongoose." });
  });

  app.use(express.json(), livros, autores);
};

export default routes;
