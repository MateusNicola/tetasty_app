<template>
  <q-card class="q-ma-lg q-pa-md">
    <h5>Cadastro Receita</h5>
    <FormReceita @salvarReceita="onSalvarReceita" :receita="receita" />
  </q-card>
</template>
<script>
import FormReceita from "../components/FormReceita.vue";
import services from "src/services";
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
