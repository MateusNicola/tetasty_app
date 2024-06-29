import axios from "axios";
import { Notify } from "quasar";
import usuarioStore from "src/stores/usuarioStore.js";

const jsonAPI = axios.create({
  baseURL: process.env.URL,
});

const receitasServices = {
  getReceitas: (callback) => {
    const idUsuario = usuarioStore.idUsuario;
    jsonAPI
      .get("receitas")
      .then((retorno) => {
        const receitasFiltradas = retorno.data.filter(
          (receita) => receita.idUsuario === idUsuario
        );
        callback(receitasFiltradas);
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
  getReceitaPorId(id, callback) {
    jsonAPI
      .get(`receitas/${id}`)
      .then((retorno) => {
        callback(retorno.data);
        console.log(retorno.data);
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
    if (receita.id) {
      jsonAPI
        .put(`receitas/${receita.id}`, receita)
        .then(() => {
          Notify.create({
            message: "Receita atualizada com sucesso",
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
    } else {
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
    }
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
