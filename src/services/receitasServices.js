import axios from "axios";
import { Notify } from "quasar";

const jsonAPI = axios.create({
  baseURL: process.env.URL,
});

const receitasServices = {
  getReceitas: (callback) => {
    jsonAPI
      .get("receitas")
      .then((retorno) => {
        callback(retorno.data);
      })
      .catch((erro) => {
        Notify.create({
          message: erro.message,
          color: "negative",
          position: "bottom",
          timeout: 3000,
        });
      });
  },

  addReceita: (novaReceita, callback) => {
    jsonAPI
      .post("receitas", novaReceita)
      .then((retorno) => {
        callback(retorno.data);
        Notify.create({
          message: "Receita adicionada com sucesso!",
          color: "positive",
          position: "bottom",
          timeout: 3000,
        });
      })
      .catch((erro) => {
        Notify.create({
          message: erro.message,
          color: "negative",
          position: "bottom",
          timeout: 3000,
        });
      });
  },
};

export default receitasServices;
