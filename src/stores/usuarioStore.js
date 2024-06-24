import { defineStore } from "pinia";

const useStore = defineStore("usuarioStore", {
  state: () => ({
    idUsuario: null,
  }),
});

const usurarioStore = useStore();
export default usurarioStore;
