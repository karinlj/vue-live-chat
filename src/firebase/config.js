import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZTs3eqyZ_-GLWEk_c_5pcTBn1MX5jDgU",
  authDomain: "live-vue-chat-e3a80.firebaseapp.com",
  projectId: "live-vue-chat-e3a80",
  storageBucket: "live-vue-chat-e3a80.appspot.com",
  messagingSenderId: "419767461694",
  appId: "1:419767461694:web:cdbd8c92619df92ef5ee6f",
};
//init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
//const timestamp = firebase.firestore.fieldValue.serverTimestamp;

export { projectFirestore, projectAuth };

// export { projectFirestore, timestamp, projectAuth };
