<template>
  <div>
    <q-card
      flat
      bordered
      class="card"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
      v-for="receita in receitas"
      :key="receita.nome"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              {{ receita.titulo }}
              <q-icon
                :name="receita.favorita ? 'favorite' : 'favorite_border'"
              />
              <br />
              <q-rating
                size="1em"
                color="primary"
                icon="star_border"
                icon-selected="star"
                v-model="receita.classificacao"
                readonly
              />
            </div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="editarReceita(receita)">
                    <q-item-section avatar> Editar </q-item-section>
                  </q-item>
                  <q-item clickable @click="excluirReceita(receita)">
                    <q-item-section avatar> Excluir </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar> Compartilhar </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-subtitle1">
          <b>Rendimento: </b>{{ receita.rendimento }}
        </div>
        <div class="text-subtitle1"><b>Ingredientes:</b></div>
        <div
          class="text-subtitle1"
          v-html="formatText(receita.ingredientes)"
        ></div>
        <div class="text-subtitle1"><b>Modo de preparo</b></div>
        <div
          class="text-subtitle1"
          v-html="formatText(receita.modoPreparo)"
        ></div>
        <q-separator />
        <div class="text-subtitle1"><b>Tags:</b> <br />{{ receita.tags }}</div>
      </q-card-section>
      <q-separator />
    </q-card>
  </div>
</template>

<script>
import services from "src/services";
import receitasStore from "src/stores/receitasStore.js";

export default {
  name: "ListaReceitas",
  emits: ["excluirReceita"],
  props: {
    receitas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatText(text) {
      return text.replace(/\n/g, "<br>");
    },
    excluirReceita(receita) {
      services.receitas.deleteReceita(receita.id, (data) => {
        this.$emit("excluirReceita", receita.id);
      });
    },
    editarReceita(receita) {
      receitasStore.receita = receita;
      console.log(receitasStore.receita);
    },
  },
};
</script>

<style>
.card {
  width: 100%;
}
</style>
