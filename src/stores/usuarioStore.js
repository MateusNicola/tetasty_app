import { defineStore } from "pinia";

const useStore = defineStore("usuarioStore", {
  state: () => ({
    idUsuario: null,
    nome: "",
  }),
});

const usurarioStore = useStore();
export default usurarioStore;
