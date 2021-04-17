import firebase from "firebase";

const config = {
    apiKey: "AIzaSyBnsyTdslOhB3fRC6aoRz7xMwc9V7XFr7M",
    authDomain: "project-manager-8000a.firebaseapp.com",
    projectId: "project-manager-8000a",
    storageBucket: "project-manager-8000a.appspot.com",
    messagingSenderId: "970117638421",
    appId: "1:970117638421:web:9a65d2264f82b96733211c",
    measurementId: "G-VKX8LN5XYK"
      
}

firebase.initializeApp(config);
export default firebase;