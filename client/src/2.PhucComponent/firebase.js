// import firebase from 'firebase';
// import '@firebase/storage';
import { initializeApp } from 'firebase/app'; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDjDpcgh1HwA70wX1kFkQ_B0JJ_SpCL3cM",
    authDomain: "pharmacy-50ba9.firebaseapp.com",
    projectId: "pharmacy-50ba9",
    storageBucket: "pharmacy-50ba9.appspot.com",
    messagingSenderId: "285817334104",
    appId: "1:285817334104:web:8057ed4d42cad8c814dd2d"
  };

const app = initializeApp(firebaseConfig)
const storage = getStorage(app);
export default storage;

  // firebase.initializeApp(firebaseConfig);
  // var storage = firebase.storage();
  // export default storage;