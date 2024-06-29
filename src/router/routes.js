const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/MinhasReceitas",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ListaReceitaPage.vue") },
    ],
  },
  {
    path: "/CadastroReceita",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "CadastroReceita",
        props: true,
        component: () => import("pages/CadastroReceitaPage.vue"),
      },
    ],
  },
  {
    path: "/EditarReceita/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "EditarReceita",
        props: true,
        component: () => import("pages/EditarReceitaPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
