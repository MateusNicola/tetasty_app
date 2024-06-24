<template>
  <q-card class="q-ma-lg q-pa-md">
    <h5>Cadastro Receita</h5>
    <FormReceita
      @salvarReceita="onSalvarReceita"
      :receita="receitasStore.receita"
    />
  </q-card>
</template>
<script>
import FormReceita from "src/components/FormReceita.vue";
import services from "src/services";
import receitasStore from "src/stores/receitasStore.js";

export default {
  name: "CadastroReceitaPage",
  components: {
    FormReceita,
  },
  data() {
    return {
      receita: {},
    };
  },
  methods: {
    onSalvarReceita(receita) {
      if (receita.id) {
        services.receita.updateReceita(receita);
      } else {
        services.receitas.saveReceita(receita);
      }
    },
  },
};
</script>
