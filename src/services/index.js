import { Notify } from "quasar";
import receitasServices from "./receitasServices";
import usuariosServices from "./usuarioServices";

const services = {
  receitas: receitasServices,
  usuarios: usuariosServices,
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
