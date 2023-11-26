import { useState, useEffect } from "react";
import {app as firebaseApp, getPlantsCollection, getAnimalDocument} from "../firebase.js"
import Search from './Search.js'
// import Animals from "./Animals.js";

const Plants = ({firebaseApp}) => {
    const [plants, setPlantes] = useState([]);
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")

    const fetchPlants = async () => {
        let plantsArray = await getPlantsCollection()
        plantsArray = plantsArray.filter(data => data.name.toLowerCase().includes(search.toLowerCase()) || data.description.toLowerCase().includes(search.toLowerCase()))
        plantsArray = plantsArray.filter(data => filter === "" || data.animals.some(animal => animal.name == filter))
        setPlantes(plantsArray);
    }

    useEffect(() => {
        fetchPlants()
    }, [search, filter])

    return <div>
        <h2>TOXIPLANTES</h2>
        <p className="presentation-site">Si on dit que le chien est le meilleur ami de l'Homme, c'est aussi le cas du chat et du cheval. Grâce à ce site, vous pourrez protéger vos animaux à 4 pattes des plantes toxiques pour eux !</p>
        <Search setSearch={setSearch} setFilter={setFilter} />
        <div className="tableau">
            {plants.map((plant, index) => (
                <div key={index} className="plant">
                    <h3 className="name">{plant.name}</h3> 
                    <img className="plant-image" src={plant.image} />
                    <p className="description">{plant.description}</p>
                    <div className="animals">
                        <h4>Toxique pour</h4>
                        <ul>
                        {plant.animals.map(a => (
                            <li key={a.name} className={a.name}>{a.name}</li>
                        ))}
                        </ul>
                       
                        {/* {console.log(plant.image)} */}
                    </div>
                </div>
            ))}
        </div>
    </div>       
}

export default Plants