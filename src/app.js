import express from "express";

import db from "./config/db.js";

import routes from "./routes/index.js";
import manipularDeErros from "./middlewares/manipularDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipularDeErros);

export default app;
