import { useState, useEffect } from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore"
import {app as firebaseApp, getPlantsCollection, getAnimalDocument} from "../firebase.js"

// const Animals = ({firebaseApp, animals}) => {
//     const [animalsArray, setAnimalsArray] = useState([]);
//     console.log(animals)
// }

// export default Animals