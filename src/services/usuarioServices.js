import axios from "axios";
import { Notify } from "quasar";

const jsonAPI = axios.create({
  baseURL: process.env.URL,
});

const usuariosServices = {
  saveUsuario(id, nome, email) {
    const usuario = {
      id: id,
      nome: nome,
      email: email,
    };
    jsonAPI
      .get(`usuarios?email=${encodeURIComponent(email)}`)
      .then((response) => {
        if (response.data.length > 0) {
          // Usuário já existe
          Notify.create({
            message: "Usuário com esse email já existe",
            color: "negative",
            position: "top",
            timeout: 5000,
          });
        } else {
          // Criar o usuário se não existir
          jsonAPI
            .post("usuarios", usuario)
            .then(() => {
              Notify.create({
                message: "Usuário criado com sucesso",
                color: "positive",
                position: "top",
                timeout: 5000,
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

export default usuariosServices;
