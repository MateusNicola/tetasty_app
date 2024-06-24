import { defineStore } from "pinia";

const useStore = defineStore("receitasStore", {
  state: () => ({
    receita: [],
  }),
});

const receitasStore = useStore();
export default receitasStore;
