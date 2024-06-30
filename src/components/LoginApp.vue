<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <h5 class="text-h5 q-ma-sm">LOGIN</h5>
        <q-form ref="loginForm" @submit="login">
          <q-input
            v-model="LoginModel.email"
            class="q-pa-sm"
            label="Email"
            type="email"
            outlined
            :rules="[validaEmail]"
          />
          <br />
          <q-input
            v-model="LoginModel.senha"
            class="q-pa-sm"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            outlined
            :rules="[validaSenha]"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="togglePassword"
              />
            </template>
          </q-input>
          <br />
          <q-btn
            type="submit"
            label="Acessar"
            color="primary"
            class="full-width q-ma-sm"
          />
          <q-btn
            type="button"
            label="Cadastre-se"
            color="primary"
            class="full-width q-ma-sm"
            @click="showCadastroDialog"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="isCadastroDialogOpen">
      <q-card>
        <q-card-section class="text-h6"> Cadastro </q-card-section>
        <q-card-section>
          <q-form ref="cadastroForm" @submit="criarLogin">
            <q-input
              v-model="CadastroModel.nome"
              class="q-pa-sm"
              label="Nome"
              type="text"
              outlined
              :rules="[validaNome]"
            />
            <br />
            <q-input
              v-model="CadastroModel.email"
              class="q-pa-sm"
              label="Email"
              type="email"
              outlined
              :rules="[validaEmail]"
            />
            <br />
            <q-input
              v-model="CadastroModel.senha"
              class="q-pa-sm"
              label="Senha"
              :type="showPasswordCadastro ? 'text' : 'password'"
              outlined
              :rules="[validaSenha]"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPasswordCadastro ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="togglePasswordCadastro"
                />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
          <q-btn flat label="Criar" color="primary" @click="criarLogin" />
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
      showPassword: false,
      showPasswordCadastro: false,
      isCadastroDialogOpen: false,
    };
  },
  methods: {
    validaEmail(val) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(val) || "Email inválido";
    },
    validaSenha(val) {
      return (
        (val && val.length >= 6) || "Senha deve ter pelo menos 6 caracteres"
      );
    },
    validaNome(val) {
      return (val && val.trim().indexOf(" ") !== -1) || "Nome é obrigatório.";
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    togglePasswordCadastro() {
      this.showPasswordCadastro = !this.showPasswordCadastro;
    },
    login() {
      if (this.$refs.loginForm.validate()) {
        firebaseServices.loginComEmailSenha(
          this.LoginModel.email,
          this.LoginModel.senha,
          (user) => {
            services.mensagem("Bem-vindo! Ao TeTasty");
            userStore.idUsuario = user.uid;
            this.$router.push("/MinhasReceitas");
          }
        );
      }
    },
    showCadastroDialog() {
      this.isCadastroDialogOpen = true;
    },
    criarLogin() {
      if (this.$refs.cadastroForm.validate()) {
        firebaseServices.criarUsuarioComEmailSenha(
          this.CadastroModel.email,
          this.CadastroModel.senha,
          (user) => {
            services.mensagem("Usuário criado com sucesso");
            services.usuarios.saveUsuario(
              user.uid,
              this.CadastroModel.nome,
              this.CadastroModel.email
            );
          }
        );
      }
    },
  },
};
</script>

<style></style>
