import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD-GMZDvvGJvi_q28Al9HcuGtNf66zhZzY',
  authDomain: 'square-foot-garden-d2c37.firebaseapp.com',
  databaseURL:
    'https://square-foot-garden-d2c37-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'square-foot-garden-d2c37',
  storageBucket: 'square-foot-garden-d2c37.appspot.com',
  messagingSenderId: '473201497222',
  appId: '1:473201497222:web:06ba06fed9ddf28ba02d07',
  measurementId: 'G-08VEBDD5X4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
