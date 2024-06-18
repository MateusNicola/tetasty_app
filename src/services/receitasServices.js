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

  saveReceita(receita) {
    jsonAPI
      .post("receitas", receita)
      .then(() => {
        Notify.create({
          message: "Receita criada com sucesso",
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

  deleteReceita(id, callback) {
    jsonAPI
      .delete(`receitas/${id}`)
      .then((retorno) => {
        Notify.create({
          message: "Receita excluída com sucesso",
          color: "positive",
          position: "bottom",
          timeout: 3000,
        });
        if (callback) {
          callback(retorno.data);
        }
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
