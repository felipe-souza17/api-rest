import express from "express";

import db from "./config/db.js";

import routes from "./routes/index.js";
import mongoose from "mongoose";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

routes(app);

// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  console.error(erro);
  if (erro instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else {
    res.status(500).send({ message: "Erro interno de servidor" });
  }
});

export default app;
