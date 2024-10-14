import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCljcv66ztOwWe-ARwjElDgDcdHqT9N_D4",
  authDomain: "server-less-pipeline.firebaseapp.com",
  projectId: "server-less-pipeline",
  storageBucket: "server-less-pipeline.appspot.com",
  messagingSenderId: "918567319943",
  appId: "1:918567319943:web:3e3812771da244bf28bb22",
  measurementId: "G-JMSVRWW9WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app); 

// Export Firestore and Storage
export { firestore, storage };