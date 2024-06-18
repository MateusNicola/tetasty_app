<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn color="primary" icon="menu">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/MinhasReceitas">
                <q-item-section>Minhas receitas</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Sobre</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toolbar-title> TeTasty </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Minha receitas",
    caption: "",
    icon: "blender",
    link: "",
  },
  {
    title: "Sobre",
    caption: "",
    icon: "contact_page",
    link: "",
  },
];

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      linksList,
      leftDrawerOpen: false,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
});
</script>
