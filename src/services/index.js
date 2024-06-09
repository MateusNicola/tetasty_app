import { Notify } from "quasar";
import receitasServices from "./receitasServices";

const services = {
  receitas: receitasServices,
  mensagem: (msg) => {
    Notify.create({
      message: msg,
      color: "primary",
      position: "bottom",
      timeout: 3000,
    });
  },
  mensagemErro: (msg) => {
    Notify.create({
      message: msg,
      color: "negative",
      position: "bottom",
      timeout: 3000,
    });
  },
};

export default services;
