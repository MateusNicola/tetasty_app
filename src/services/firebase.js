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

const firebaseServices = {
  criarUsuarioComEmailSenha: (email, senha, callback) => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        if (callback) {
          callback(user);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  },
  loginComEmailSenha: (email, senha, callback) => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (callback) {
          callback(user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        services.mensagemErro("Usuário não cadastrado." + errorMessage);
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
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        services.mensagemErro(errorMessage);
        // ...
      });
  },
  salvarUsuario: (uid, email, callback) => {
    let refUser = ref(database, `usuarios/${uid}`);
    set(refUser, { uid: uid, email: email })
      .then(() => {
        services.mensagem("Usuario salvo com sucesso");
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        services.mensagemErro("Erro ao salvar o usuario: " + error);
      });
  },
};

export default firebaseServices;
