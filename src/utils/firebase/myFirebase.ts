import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";


class Firebase{
    FIREBASE_CONFIG = {
      apiKey: "AIzaSyDVuj1mQXiQq0AVkMdS-wXiXt3Zmp6WHWo",
      authDomain: "fir-chat-ae8e1.firebaseapp.com",
      projectId: "fir-chat-ae8e1",
      storageBucket: "fir-chat-ae8e1.appspot.com",
      messagingSenderId: "41929320737",
      appId: "1:41929320737:web:c4636dd13f5041f3bfb660"
    };

    firebase = firebase

    auth:firebase.auth.Auth
    database:firebase.database.Database

    constructor(){
      firebase.initializeApp( this.FIREBASE_CONFIG );
      this.auth = this.firebase.auth();
      this.database = this.firebase.database();
    }
}

const myFirebase = new Firebase();

export default myFirebase;