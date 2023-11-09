import { useState, useEffect } from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore"
import {app as firebaseApp, getPlantsCollection, getAnimalDocument} from "../firebase.js"
// import Animals from "./Animals.js";

const Plants = ({firebaseApp}) => {
    const [plants, setPlantes] = useState([]);

    const fetchPlants = async () => {
        const plantsArray = await getPlantsCollection()
        // plantsArray.animaux.map( async(animal) => {
            // const newAnimal = await getAnimalDocument(animal._key.path.segments[6])
            // console.log(newAnimal)
        // })
        // console.log(plants)
        setPlantes(plantsArray);
    }

    useEffect(() => {
        fetchPlants()
    }, [])

    return <div>
    <h2>TOXIPLANTES</h2>
    <div className="tableau">
        {plants.map((plant, index) => (
            <div key={index} className="plant">
                <h3 className="name">{plant.name}</h3>
                <p className="description">{plant.description}</p>
                {console.log(plant)}
            </div>
        ))}
    </div>
    </div>       
}

export default Plants