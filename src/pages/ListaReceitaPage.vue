<template>
  <q-btn class="q-ma-md" to="/CadastroReceita">Criar nova receita</q-btn>
  <q-page padding>
    <ListaReceitas :receitas="receitas" @excluirReceita="ListarReceitas" />
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
    this.ListarReceitas();
  },
  methods: {
    ListarReceitas() {
      services.receitas.getReceitas((receitas) => {
        this.receitas = receitas;
      });
    },
  },
};
</script>
<style></style>
