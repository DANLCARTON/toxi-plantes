// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, doc, getDoc, QuerySnapshot } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL} from "firebase/storage"
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
const storage = getStorage()

const getPlantsCollection = async () => {
  const plantsRef = collection(db, "plantes");
  const querySnapshot = await getDocs(plantsRef)
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    animals: [],
    image: "",
    ...doc.data()
  }))

  await Promise.all(
    data.map(async (dat) => {
      await Promise.all(
        dat.animaux.map(async (animal) => {
          const arr = await getAnimalDocument(animal.id);
          dat.animals.push(arr);
        })
      );

      const pathRef = ref(storage, encodeURIComponent(dat.id + '.jpeg'));
      try {
        const url = await getDownloadURL(pathRef);
        dat.image = url;
      } catch (err) {
        console.error(err);
      }

    })
  );
  
  return data
}

const getAnimalDocument = async (animalReference) => {
  const animalRef = collection(db, "animaux");
  const docRef = doc(animalRef, animalReference)
  const docSnapshot = await getDoc(docRef)
  return docSnapshot.data() 
}

export {app, getPlantsCollection, getAnimalDocument}
