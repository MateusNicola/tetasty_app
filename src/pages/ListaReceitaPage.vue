<template>
  <q-page padding>
    <ListaReceitas :receitas="receitas" />
  </q-page>
</template>
<script>
import services from "src/services";
import ListaReceitas from "src/components/ListaReceitas.vue";

export default {
  name: "ListaReceitaPage",
  components: {
    ListaReceitas,
  },
  data() {
    return {
      receitas: [],
    };
  },
  created() {
    services.receitas.getReceitas((receitas) => {
      this.receitas = receitas;
    });
  },
  methods: {},
};
</script>
<style></style>
