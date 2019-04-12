import firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyAQBVVytjEDdSH42DCbxCKLhwiJsYfVj48",
  authDomain: "bettingsp-f6da7.firebaseapp.com",
  databaseURL: "https://bettingsp-f6da7.firebaseio.com",
  projectId: "bettingsp-f6da7",
  storageBucket: "bettingsp-f6da7.appspot.com",
  messagingSenderId: "253641045840"
};

const fire = firebase.initializeApp(config);

export default fire;
