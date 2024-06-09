<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
      v-for="receita in receitas"
      :key="receita.nome"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              {{ receita.nome }}
              <q-icon
                :name="receita.favorita ? 'favorite' : 'favorite_border'"
              />
            </div>
          </div>
          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="black" name="delete" />
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon color="black" name="share" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">Rendimento: {{ receita.rendimento }}</div>
        <div class="text-subtitle1">Ingredientes:</div>
        <ul>
          <li
            v-for="ingrediente in receita.ingredientes"
            :key="ingrediente.item"
          >
            {{ ingrediente.quantidade }} {{ ingrediente.unidade }} de
            {{ ingrediente.item }}
          </li>
        </ul>
        <div class="text-subtitle1">Modo de Preparo:</div>
        <ol>
          <li v-for="passo in receita.modoPreparo" :key="passo.passo">
            {{ passo.descricao }}
          </li>
        </ol>
      </q-card-section>

      <q-separator />
    </q-card>
  </div>
</template>

<script>
export default {
  name: "ListaReceitas",
  props: {
    receitas: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
