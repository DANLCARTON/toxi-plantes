import { useState, useEffect } from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore"
import {app as firebaseApp, getPlantsCollection, getAnimalDocument} from "../firebase.js"

const Plants = ({firebaseApp}) => {
    const [plants, setPlantes] = useState([]);
    const [animals, setAnimals] = useState([]);

    const fetchPlants = async () => {
        const plantsArray = await getPlantsCollection();
        setPlantes(plantsArray);
    }

    const fetchAnimals = async () => {
        const tempAnimals = await Promise.all(
            plants.map((plant) => {
                plant.animaux.map( async (animal) => {
                    const newAnimal = await getAnimalDocument(animal._key.path.segments[6]);
                    return newAnimal;
                })
            })
        );
        setAnimals(tempAnimals);
    }

    useEffect(() => {
        fetchPlants();
    }, []);

    useEffect(() => {
        if (plants.length > 0) {
            fetchAnimals(plants);
        }
    }, [plants]);

    return <div>
    <h2>TOXIPLANTES</h2>
    <div className="tableau">
        {plants.map((plant, index) => (
            <div key={index} className="plant">
                <h3 className="name">{plant.name}</h3>
                <p className="description">{plant.description}</p>
                {console.log(animals)}
                {animals.map((animal) => (
                    <p>{animal.name}</p>
                ))}
            </div>
        ))}
    </div>
</div>       
}

export default Plants