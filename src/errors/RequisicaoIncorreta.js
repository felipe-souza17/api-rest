import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor() {
    super("Um ou mais dados fornecidor estão incorretos", 400);
  }
}

export default RequisicaoIncorreta;
