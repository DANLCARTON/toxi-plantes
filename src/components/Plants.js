import { useState, useEffect } from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore"

const Plants = ({firebaseApp}) => {
    const [plants, setPlantes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(firebaseApp);
            const plantsCollection = collection(db, "plantes")
            const querySnapshot = await getDocs(plantsCollection)

            const plantsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data();
            }))

            setPlantes(plantsData)
        };

        fetchData();

    }, [firebaseApp])

    return <div>
        <h2>Pantes</h2>
        {plantes.map((plant) => (
            <div key={plant.name}><b>{plant.name}</b> : {plant.description}</div>
        ))}
    </div>
}