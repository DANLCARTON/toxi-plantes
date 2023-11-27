import { useState, useEffect } from "react";
import {app as firebaseApp, getPlantsCollection} from "../firebase.js"
import Search from './Search.js'
// import Animals from "./Animals.js";

const ReadMore = ({children}) => {
    const text = children
    const [isReadMore, setIsReadMore] = useState(true)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    return <div>
        <p className="description">
            {isReadMore ? text.slice(0, 200) : text}
            <span>{isReadMore && "..."}</span>
            <br />
            <span className="read-more" onClick={() => toggleReadMore()} >
                {isReadMore ? "voir plus" : "voir moins"}
            </span>
        </p>
    </div>
}

const Plants = ({firebaseApp}) => {
    const [plants, setPlantes] = useState([]);
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")

    const fetchPlants = async () => {
        let plantsArray = await getPlantsCollection()
        plantsArray = plantsArray.filter(data => data.name.toLowerCase().includes(search.toLowerCase()) || data.description.toLowerCase().includes(search.toLowerCase()))
        plantsArray = plantsArray.filter(data => filter === "" || data.animals.some(animal => animal.name === filter))
        plantsArray.sort((a, b) => a.name.localeCompare(b.name))
        setPlantes(plantsArray);
    }

    useEffect(() => {
        fetchPlants()
    }, [search, filter])

    return <div>
        {/* <h2>TOXIPLANTES</h2> */}
        <Search setSearch={setSearch} setFilter={setFilter} />
        <div className="tableau">
            {plants.map((plant, index) => (
                <div key={index} className="plant">
                    <h3 className="name">{plant.name}</h3> 
                    <img className="plant-image" src={plant.image} alt={plant.name} />
                    {/* <p className="description">{plant.description}</p> */}
                    <ReadMore>
                        {plant.description}
                    </ReadMore>
                    <div className="animals">
                        <h4>Toxique pour</h4>
                        <ul>
                        {plant.animals.map(a => (
                            <li key={a.name} className={a.name}>{a.name}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>       
}

export default Plants