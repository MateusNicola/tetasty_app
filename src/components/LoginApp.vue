<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <h5 class="text-h5 q-ma-sm">LOGIN</h5>
        <q-input
          v-model="LoginModel.email"
          class="q-pa-sm"
          label="Email"
          type="email"
          outlined
        />
        <q-input
          v-model="LoginModel.senha"
          class="q-pa-sm"
          label="Senha"
          type="password"
          outlined
        />
        <q-btn
          type="submit"
          label="Acessar"
          color="primary"
          class="full-width q-ma-sm"
          @click="login"
        />
        <q-btn
          type="button"
          label="Cadastre-se"
          color="primary"
          class="full-width q-ma-sm"
          @click="showCadastroDialog"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="isCadastroDialogOpen">
      <q-card>
        <q-card-section class="text-h6"> Cadastro </q-card-section>
        <q-card-section>
          <q-input
            v-model="CadastroModel.nome"
            class="q-pa-sm"
            label="Nome"
            type="text"
            outlined
          />
          <q-input
            v-model="CadastroModel.email"
            class="q-pa-sm"
            label="Email"
            type="email"
            outlined
          />
          <q-input
            v-model="CadastroModel.senha"
            class="q-pa-sm"
            label="Senha"
            type="password"
            outlined
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
          <q-btn flat label="Criar" color="primary" @click="criarLogin()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import services from "src/services";
import firebaseServices from "src/services/firebase";
import userStore from "src/stores/usuarioStore.js";

export default {
  name: "LoginApp",
  data() {
    return {
      LoginModel: {
        email: "",
        senha: "",
      },
      CadastroModel: {
        id: "",
        nome: "",
        email: "",
        senha: "",
      },
      isCadastroDialogOpen: false,
    };
  },
  methods: {
    login() {
      firebaseServices.loginComEmailSenha(
        this.LoginModel.email,
        this.LoginModel.senha,
        (user) => {
          services.mensagem("Bem-vindo usuário: " + user.uid);
          userStore.idUsuario = user.uid;
          this.$router.push("/MinhasReceitas");
        }
      );
    },
    showCadastroDialog() {
      this.isCadastroDialogOpen = true;
    },
    criarLogin() {
      firebaseServices.criarUsuarioComEmailSenha(
        this.CadastroModel.email,
        this.CadastroModel.senha,
        (user) => {
          services.mensagem("Usuário criado com sucesso " + user.uid);
          services.usuarios.saveUsuario(
            user.uid,
            this.CadastroModel.nome,
            this.CadastroModel.email
          );
        }
      );
    },
  },
};
</script>

<style></style>
