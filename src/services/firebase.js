// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import services from ".";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleFirebaseError = (error) => {
  let message;
  console.log(error.code);
  switch (error.code) {
    case "auth/email-already-in-use":
      message = "Este e-mail já está em uso. Por favor, tente outro e-mail.";
      break;
    case "auth/invalid-email":
      message = "O e-mail fornecido é inválido. Verifique e tente novamente.";
      break;
    case "auth/weak-password":
      message =
        "A senha é muito fraca. Por favor, escolha uma senha mais forte.";
      break;
    case "auth/user-not-found":
      message =
        "Usuário não encontrado. Verifique suas credenciais e tente novamente.";
      break;
    case "auth/wrong-password":
      message = "Senha incorreta. Por favor, tente novamente.";
      break;
    case "auth/popup-closed-by-user":
      message =
        "A janela de autenticação foi fechada antes de completar o login. Tente novamente.";
      break;
    default:
      message =
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
      break;
  }
  return message;
};

const firebaseServices = {
  criarUsuarioComEmailSenha: (email, senha, callback) => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        if (callback) {
          callback(user);
        }
      })
      .catch((error) => {
        const errorMessage = handleFirebaseError(error);
        services.mensagemErro(errorMessage);
      });
  },
  loginComEmailSenha: (email, senha, callback) => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        if (callback) {
          callback(user);
        }
      })
      .catch((error) => {
        const errorMessage = handleFirebaseError(error);
        services.mensagemErro(errorMessage);
      });
  },
  loginComGoogle: (callback) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        if (callback) {
          callback(user);
        }
      })
      .catch((error) => {
        const errorMessage = handleFirebaseError(error);
        services.mensagemErro(errorMessage);
      });
  },
  salvarUsuario: (uid, email, callback) => {
    let refUser = ref(database, `usuarios/${uid}`);
    set(refUser, { uid: uid, email: email })
      .then(() => {
        services.mensagem("Usuário salvo com sucesso");
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        services.mensagemErro("Erro ao salvar o usuário: " + error);
      });
  },
};

export default firebaseServices;
