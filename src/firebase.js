// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuJh0nuad1NTnY4CrQ1WW4lovZArwt7m4",
  authDomain: "toxiplantes2.firebaseapp.com",
  projectId: "toxiplantes2",
  storageBucket: "toxiplantes2.appspot.com",
  messagingSenderId: "700626087056",
  appId: "1:700626087056:web:15c669c1b4855dbad27c15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const getPlantsCollection = async () => {
  const plantsRef = collection(db, "plantes");
  const querySnapshot = await getDocs(plantsRef)
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  console.log(data)
  return data
  console.log(data)
}

const getAnimalDocument = async (animalReference) => {
  const animalRef = collection(db, "animaux");
  const docRef = doc(animalRef, animalReference)
  const docSnapshot = await getDoc(docRef)
  return docSnapshot.data()
}

export {app, getPlantsCollection, getAnimalDocument}
