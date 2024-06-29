<template>
  <q-card class="q-ma-lg q-pa-md">
    <h5>Editar Receita</h5>
    <FormReceita :receita="receita" />
  </q-card>
</template>

<script>
import FormReceita from "src/components/FormReceita.vue";
import services from "src/services";

export default {
  name: "EditarReceitaPage",
  components: {
    FormReceita,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      receita: {},
    };
  },
  created() {
    this.carregarReceita();
  },
  methods: {
    carregarReceita() {
      services.receitas.getReceitaPorId(this.id, (data) => {
        this.receita = data;
        console.log(data);
      });
    },
  },
};
</script>
