<template>
  <q-form ref="form" @submit="salvar">
    <div class="q-gutter-sm" style="max-width: 100%">
      <q-rating
        v-model="receitaModel.classificacao"
        size="2em"
        color="primary"
        icon="star_border"
        icon-selected="star"
      />
      <div class="container" style="max-width: 100%">
        <q-input
          label="Titulo"
          clearable
          square
          outlined
          v-model="receitaModel.titulo"
          :rules="[validaTitulo]"
        />
        <q-checkbox
          v-model="receitaModel.favorita"
          checked-icon="star"
          unchecked-icon="star_border"
          indeterminate-icon="star_border"
        />
      </div>
      <div class="container2" style="max-width: 100%">
        <q-input
          label="Rendimento"
          clearable
          square
          outlined
          v-model="receitaModel.rendimento"
          :rules="[validaRendimento]"
        />
        <q-input
          label="Tempo de preparo"
          clearable
          square
          outlined
          v-model="receitaModel.tempoPreparo"
          :rules="[validaTempoPreparo]"
        />
      </div>
      <br />
      <q-input
        label="Ingredientes"
        hint="Exemplo: - 1 xícara de ..."
        clearable
        square
        outlined
        v-model="receitaModel.ingredientes"
        filled
        autogrow
        :rules="[validaIngredientes]"
      />
      <br />
      <q-input
        label="Modo de preparo"
        hint="Exemplo: - Em uma forma ..."
        clearable
        square
        outlined
        v-model="receitaModel.modoPreparo"
        filled
        autogrow
        :rules="[validaModoPreparo]"
      />
      <br />
      <q-input
        label="Tags"
        hint="Exemplo: café, leite, café da manha"
        clearable
        square
        outlined
        v-model="receitaModel.tags"
      />
      <q-btn label="Salvar" @click="salvar" color="primary" class="q-mt-md" />
      <q-btn
        to="/MinhasReceitas"
        label="Salvar e sair"
        @click="salvarESair"
        color="primary"
        class="q-mt-md"
      />
    </div>
  </q-form>
</template>

<script>
import services from "src/services";
import usuarioStore from "src/stores/usuarioStore.js";

export default {
  name: "FormCadastroReceita",
  emits: ["salvarReceita"],
  props: {
    receita: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      receitaModel: {
        idUsuario: usuarioStore.idUsuario,
        titulo: "",
        favorita: false,
        rendimento: "",
        tempoPreparo: "",
        classificacao: 0,
        tags: [],
        ingredientes: "",
        modoPreparo: "",
      },
    };
  },
  watch: {
    receita: {
      handler(newVal) {
        if (newVal) {
          this.receitaModel = { ...this.receitaModel, ...newVal };
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    validaTitulo(val) {
      return val ? true : "Título é obrigatório";
    },
    validaRendimento(val) {
      return val ? true : "Rendimento é obrigatório";
    },
    validaTempoPreparo(val) {
      return val ? true : "Tempo de preparo é obrigatório";
    },
    validaIngredientes(val) {
      return val ? true : "Ingredientes são obrigatórios";
    },
    validaModoPreparo(val) {
      return val ? true : "Modo de preparo é obrigatório";
    },
    salvar() {
      if (this.$refs.form.validate()) {
        services.receitas.saveReceita(this.receitaModel);
      }
    },
    salvarESair() {
      if (this.$refs.form.validate()) {
        services.receitas.saveReceita(this.receitaModel);
        this.$router.push("/MinhasReceitas");
      }
    },
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 95%);
  gap: 5px;
}
.container2 {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 5px;
}
</style>
