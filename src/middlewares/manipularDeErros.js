import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

// eslint-disable-next-line no-unused-vars
export default function manipularDeErros(erro, req, res, next) {
  console.error(erro);
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    res.status(400).send({
      message: `Os seguintes erros foram encontrados: ${mensagensErro}`
    });
  } else {
    new ErroBase().enviarResposta(res);
  }
}
