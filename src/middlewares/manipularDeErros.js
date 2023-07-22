import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
export default function manipularDeErros(erro, req, res, next) {
  console.error(erro);
  if (erro instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else {
    res.status(500).send({ message: "Erro interno de servidor" });
  }
  console.log("Aqui é o terceiro middleware depois do primeiro middleware");
}
