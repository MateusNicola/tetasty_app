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
};

export default receitasServices;
